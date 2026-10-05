const path = require("node:path");
const { createRequire } = require("node:module");

const backendRequire = createRequire(
  path.join(FEEDR_BACKEND_DIR, "package.json")
);
const backend = (file) => require(path.join(FEEDR_BACKEND_DIR, "src", file));
backendRequire("reflect-metadata");

const { Test } = backendRequire("@nestjs/testing");
const { JwtService } = backendRequire("@nestjs/jwt");
const { ConfigService } = backendRequire("@nestjs/config");
const { hash } = backendRequire("bcrypt");
const { configureApp } = backend("app.setup.ts");
const { PrismaService } = backend("prisma/prisma.service.ts");
const { CloudinaryService } = backend("cloudinary/cloudinary.service.ts");
const { JwtStrategy } = backend("auth/strategies/jwt.strategy.ts");
const { getJwtSecret } = backend("auth/config/jwt-secrets.ts");
const { createPrismaMock } = backend("testing/mocks.ts");

const modules = ["auth", "article", "user", "comment", "follow", "tag"];
const classes = (suffix) =>
  modules.map((name) => {
    const exported = backend(`${name}/${name}.${suffix}.ts`);
    return exported[
      `${name[0].toUpperCase()}${name.slice(1)}${suffix === "service" ? "Service" : "Controller"}`
    ];
  });

function select(record, fields) {
  if (!record) return null;
  if (!fields) return { ...record };

  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [
      key,
      value === true ? record[key] : select(record[key], value.select),
    ])
  );
}

async function createHarness() {
  const prisma = createPrismaMock();
  const cloudinary = { uploadImage: jest.fn(), deleteImageByUrl: jest.fn() };
  const config = new ConfigService({
    JWT_SECRET: "integration-only-secret".repeat(3),
  });
  const jwt = new JwtService();
  const password = await hash("Password123!", 4);
  let users;
  let article;

  const module = await Test.createTestingModule({
    controllers: classes("controller"),
    providers: [
      ...classes("service"),
      JwtStrategy,
      { provide: PrismaService, useValue: prisma },
      { provide: CloudinaryService, useValue: cloudinary },
      { provide: JwtService, useValue: jwt },
      { provide: ConfigService, useValue: config },
    ],
  }).compile();
  const app = module.createNestApplication();
  configureApp(app);
  await app.listen(0, "127.0.0.1");
  const origin = await app.getUrl();
  const nativeFetch = global.fetch;
  const requests = [];

  // RTK Query retains its real Request, headers, body and response parsing.
  // Only the test origin is redirected to this isolated server's dynamic port.
  global.fetch = async (input, init) => {
    const request = input instanceof Request ? input : new Request(input, init);
    const url = new URL(request.url);
    if (url.origin !== "http://localhost")
      throw new Error(`Unexpected test origin: ${url.origin}`);
    requests.push({ method: request.method, path: url.pathname });
    return nativeFetch(
      new Request(`${origin}${url.pathname}${url.search}`, request)
    );
  };

  function reset() {
    jest.clearAllMocks();
    localStorage.clear();
    requests.length = 0;
    users = ["author", "reader"].map((id) => ({
      id,
      name: id,
      email: `${id}@example.com`,
      password,
      refreshTokenHash: null,
      image: "",
      bio: "",
      websiteUrl: "",
      location: "",
      createdAt: new Date(),
      _count: { articles: 1, comments: 1, followers: 0, following: 0 },
    }));
    article = {
      id: "article",
      title: "Original",
      slug: "original",
      body: "Original body",
      image: "",
      authorId: "author",
      author: users[0],
      tagList: [],
      favorited: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      _count: { comments: 1, favorited: 0 },
    };
    const findUser = ({ where, select: fields }) =>
      select(
        users.find((user) =>
          where.id ? user.id === where.id : user.email === where.email
        ),
        fields
      );
    prisma.user.findUnique.mockImplementation(findUser);
    prisma.user.findUniqueOrThrow.mockImplementation(findUser);
    prisma.user.create.mockImplementation(({ data, select: fields }) => {
      const user = {
        ...users[0],
        ...data,
        id: "registered",
        refreshTokenHash: null,
      };
      users.push(user);
      return select(user, fields);
    });
    prisma.user.update.mockImplementation(({ where, data, select: fields }) => {
      const user = users.find((item) => item.id === where.id);
      Object.assign(user, data);
      return select(user, fields);
    });
    prisma.user.updateMany.mockImplementation(({ where, data }) => {
      const user = users.find(
        (item) =>
          item.id === where.id &&
          item.refreshTokenHash === where.refreshTokenHash
      );
      if (!user) return { count: 0 };
      Object.assign(user, data);
      return { count: 1 };
    });
    const present = () => ({
      ...article,
      author: select(users[0], {
        id: true,
        name: true,
        image: true,
        bio: true,
        createdAt: true,
      }),
    });
    prisma.article.findUnique.mockImplementation(({ where }) =>
      where.slug ? null : present()
    );
    prisma.article.findMany.mockImplementation(() => [present()]);
    prisma.article.count.mockResolvedValue(1);
    prisma.article.create.mockImplementation(({ data }) => ({
      ...present(),
      ...data,
      favorited: [],
      tagList: data.tagList.connectOrCreate.map(({ create }) => ({
        id: "tag",
        ...create,
      })),
    }));
    prisma.article.update.mockImplementation(({ data }) => {
      for (const key of ["title", "body", "slug", "image"]) {
        if (key in data) article[key] = data[key];
      }
      if (data.favorited)
        article.favorited = data.favorited.connect
          ? [{ id: data.favorited.connect.id }]
          : [];
      return present();
    });
    prisma.article.delete.mockResolvedValue({ id: "article" });
    prisma.comment.findUnique.mockResolvedValue({ authorId: "author" });
    prisma.comment.findMany.mockImplementation(() => [
      {
        id: "comment",
        content: "Comment",
        author: select(users[0], { id: true, name: true, image: true }),
      },
    ]);
    prisma.comment.create.mockImplementation(({ data }) => ({
      id: "comment",
      ...data,
    }));
    prisma.comment.update.mockImplementation(({ data }) => ({
      id: "comment",
      ...data,
    }));
    prisma.comment.delete.mockResolvedValue({ id: "comment" });
    prisma.comment.deleteMany.mockResolvedValue({ count: 1 });
    prisma.follow.count.mockResolvedValue(0);
    prisma.follow.findMany.mockImplementation(() => [
      {
        follower: {
          ...select(users[1], { id: true, name: true, image: true }),
          followers: [],
        },
        following: {
          ...select(users[0], { id: true, name: true, image: true }),
          followers: [],
        },
      },
    ]);
    prisma.follow.create.mockImplementation(({ data }) => data);
    prisma.follow.deleteMany.mockResolvedValue({ count: 1 });
    prisma.tag.findMany.mockResolvedValue([
      { id: "tag", name: "react", _count: { articles: 1 } },
    ]);
    prisma.tag.findUnique.mockImplementation(() => ({
      articles: [present()],
      _count: { articles: 1 },
    }));
    prisma.$transaction.mockImplementation((operations) =>
      Promise.all(operations)
    );
    cloudinary.uploadImage.mockResolvedValue({
      secure_url: "https://example.com/upload.png",
    });
    cloudinary.deleteImageByUrl.mockResolvedValue(undefined);
  }

  return {
    prisma,
    cloudinary,
    requests,
    reset,
    token: (id, expiresIn = "15m") =>
      jwt.signAsync(
        { sub: id, type: "access" },
        {
          secret: getJwtSecret(config, "access"),
          issuer: "feeds-backend",
          audience: "feeds-api",
          expiresIn,
        }
      ),
    user: (id) =>
      JSON.parse(
        JSON.stringify(
          select(
            users.find((user) => user.id === id),
            {
              id: true,
              name: true,
              createdAt: true,
              _count: true,
            }
          )
        )
      ),
    async close() {
      global.fetch = nativeFetch;
      await app.close();
    },
  };
}

module.exports = { createHarness };
