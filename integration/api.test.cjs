const { createHarness } = require("./harness.cjs");
const { createAppStore } = require("../src/app/store");
const { api } = require("../src/app/services");
const { setUser, logout } = require("../src/features/auth/authSlice");
const { authApi } = require("../src/features/auth/authApi");
const { articlesApi } = require("../src/features/articles/articlesApi");
const { usersApi } = require("../src/features/users/usersApi");
const { commentsApi } = require("../src/features/comments/commentsApi");
const { followsApi } = require("../src/features/follows/followsApi");
const { tagsApi } = require("../src/features/tags/tagsApi");

let harness;
let store;
const subscriptions = [];

beforeAll(async () => {
  harness = await createHarness();
});
beforeEach(() => {
  harness.reset();
  store = createAppStore();
});
afterEach(async () => {
  await waitForQueries();
  subscriptions
    .splice(0)
    .forEach((subscription) => subscription.unsubscribe?.());
  store.dispatch(api.util.resetApiState());
});
afterAll(async () => {
  await harness?.close();
});

function send(endpoint, args) {
  const request = store.dispatch(endpoint.initiate(args));
  subscriptions.push(request);
  return request.unwrap();
}

function waitForQueries() {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      unsubscribe();
      reject(new Error("Queries did not settle"));
    }, 5000);
    const check = () => {
      const pending = Object.values(store.getState().api.queries).some(
        (query) => query?.status === "pending"
      );
      if (pending) return;

      clearTimeout(timeout);
      unsubscribe();
      resolve();
    };
    const unsubscribe = store.subscribe(check);
    check();
  });
}

async function authenticate(id = "author") {
  store.dispatch(
    setUser({
      user: harness.user(id),
      accessToken: await harness.token(id),
      refreshToken: "unused",
    })
  );
}

function articleBody(image) {
  const body = new FormData();
  body.set("title", "New article");
  body.set("body", "<p>Article text</p>");
  body.set("tagList", JSON.stringify([{ name: "react" }]));
  if (image) body.set("image", image, "cover.png");
  return body;
}

const png = () =>
  new Blob(
    [
      Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jR1sAAAAASUVORK5CYII=",
        "base64"
      ),
    ],
    { type: "image/png" }
  );

test("public articles and tag articles match frontend response types", async () => {
  const list = await send(articlesApi.endpoints.getArticles, {
    page: 1,
    sortBy: "top",
    q: "react",
  });
  expect(list.articles[0]).toMatchObject({
    isFavorited: false,
    author: { id: "author" },
  });
  expect(list.articles[0]).not.toHaveProperty("favorited");
  expect(harness.prisma.article.findMany).toHaveBeenCalledWith(
    expect.objectContaining({ skip: 10, take: 10 })
  );

  const tagged = await send(tagsApi.endpoints.getTagArticles, {
    tagName: "C# / React",
    page: 1,
  });
  expect(tagged._count).toBe(1);
  expect(harness.prisma.tag.findUnique.mock.calls[0][0].where.name).toBe(
    "C# / React"
  );
});

test.each([false, true])(
  "creates multipart articles with image=%s",
  async (withImage) => {
    await authenticate();
    const result = await send(
      articlesApi.endpoints.createArticle,
      articleBody(withImage ? png() : undefined)
    );
    expect(result).toMatchObject({
      title: "New article",
      tagList: [{ name: "react" }],
      isFavorited: false,
    });
    expect(harness.prisma.article.create.mock.calls[0][0].data.authorId).toBe(
      "author"
    );
    expect(harness.cloudinary.uploadImage).toHaveBeenCalledTimes(
      withImage ? 1 : 0
    );
  }
);

test("updates an article and removes its image without sending id in the body", async () => {
  await authenticate();
  const body = articleBody();
  body.set("removeImage", "true");
  const result = await send(articlesApi.endpoints.updateArticle, {
    id: "article",
    body,
  });
  expect(result).toMatchObject({ title: "New article", image: "" });
  expect(
    harness.prisma.article.update.mock.calls[0][0].data
  ).not.toHaveProperty("id");
});

test("rejects spoofed image files before uploading or creating an article", async () => {
  await authenticate();
  await expect(
    send(
      articlesApi.endpoints.createArticle,
      articleBody(new Blob(["This is not a PNG image"], { type: "image/png" }))
    )
  ).rejects.toMatchObject({ status: 400 });
  expect(harness.cloudinary.uploadImage).not.toHaveBeenCalled();
  expect(harness.prisma.article.create).not.toHaveBeenCalled();
});

test("enforces authentication and article ownership", async () => {
  await expect(
    send(articlesApi.endpoints.createArticle, articleBody())
  ).rejects.toMatchObject({ status: 401 });
  await authenticate("reader");
  await expect(
    send(articlesApi.endpoints.updateArticle, {
      id: "article",
      body: articleBody(),
    })
  ).rejects.toMatchObject({ status: 403 });
  await expect(
    send(articlesApi.endpoints.deleteArticle, "article")
  ).rejects.toMatchObject({ status: 403 });
  expect(harness.prisma.article.update).not.toHaveBeenCalled();
  expect(harness.prisma.article.delete).not.toHaveBeenCalled();
});

test("deletes an owned article and accepts the empty response", async () => {
  await authenticate();
  await expect(
    send(articlesApi.endpoints.deleteArticle, "article")
  ).resolves.toBeNull();
  expect(harness.prisma.$transaction).toHaveBeenCalled();
});

test("favorites, reads the paginated reading list, and unfavorites", async () => {
  await authenticate();
  expect(
    await send(articlesApi.endpoints.favoriteArticle, "article")
  ).toMatchObject({ isFavorited: true });
  await send(articlesApi.endpoints.getReadingList, { page: 2 });
  expect(harness.prisma.article.findMany).toHaveBeenLastCalledWith(
    expect.objectContaining({
      skip: 20,
      take: 10,
      where: { favorited: { some: { id: "author" } } },
    })
  );
  expect(
    await send(articlesApi.endpoints.unfavoriteArticle, "article")
  ).toMatchObject({ isFavorited: false });
});

test("creates, updates, pages and deletes comments with ownership checks", async () => {
  await authenticate();
  expect(
    await send(commentsApi.endpoints.createComment, {
      articleId: "article",
      content: "Hello",
    })
  ).toMatchObject({ content: "Hello", authorId: "author" });
  expect(
    await send(commentsApi.endpoints.updateComment, {
      id: "comment",
      content: "Edited",
    })
  ).toMatchObject({ content: "Edited" });
  await send(commentsApi.endpoints.getComments, { id: "article", page: 1 });
  expect(harness.prisma.comment.findMany.mock.calls[0][0]).toMatchObject({
    skip: 20,
    take: 20,
  });
  await send(commentsApi.endpoints.deleteComment, "comment");
  await authenticate("reader");
  await expect(
    send(commentsApi.endpoints.deleteComment, "comment")
  ).rejects.toMatchObject({ status: 403 });
});

test("follows, pages following lists and unfollows", async () => {
  await authenticate();
  await send(usersApi.endpoints.followUser, "reader");
  expect(harness.prisma.follow.create.mock.calls[0][0].data).toEqual({
    followerId: "author",
    followingId: "reader",
  });
  const list = await send(followsApi.endpoints.getFollowings, {
    id: "author",
    page: 1,
  });
  expect(list[0].following.isFollowing).toBe(false);
  expect(harness.prisma.follow.findMany.mock.calls[0][0]).toMatchObject({
    skip: 20,
    take: 20,
  });
  expect(await send(usersApi.endpoints.unfollowUser, "reader")).toEqual({
    count: 1,
  });
});

test.each(["name", "image"])(
  "profile %s changes refresh articles, comments and following lists",
  async (field) => {
    await authenticate();
    await Promise.all([
      send(articlesApi.endpoints.getArticles, {}),
      send(commentsApi.endpoints.getComments, { id: "article" }),
      send(followsApi.endpoints.getFollowings, { id: "reader" }),
    ]);
    const expected =
      field === "name" ? "Updated name" : "https://example.com/upload.png";
    let updated;
    if (field === "name") {
      updated = await send(usersApi.endpoints.updateUser, {
        name: expected,
        websiteUrl: "",
        bio: "",
        location: "",
      });
    } else {
      const body = new FormData();
      body.set("avatar", png(), "avatar.png");
      updated = await send(usersApi.endpoints.updateUserAvatar, body);
    }
    expect(updated[field]).toBe(expected);
    await waitForQueries();
    const state = store.getState();
    expect(
      articlesApi.endpoints.getArticles.select({})(state).data.articles[0]
        .author[field]
    ).toBe(expected);
    expect(
      commentsApi.endpoints.getComments.select({ id: "article" })(state).data[0]
        .author[field]
    ).toBe(expected);
    expect(
      followsApi.endpoints.getFollowings.select({ id: "reader" })(state).data[0]
        .following[field]
    ).toBe(expected);
  }
);

test("uploads avatars under the field name expected by the backend", async () => {
  await authenticate();
  const body = new FormData();
  body.set("avatar", png(), "avatar.png");
  expect(await send(usersApi.endpoints.updateUserAvatar, body)).toMatchObject({
    image: "https://example.com/upload.png",
  });
  expect(harness.cloudinary.uploadImage).toHaveBeenCalledWith(
    expect.objectContaining({ fieldname: "avatar" }),
    {
      kind: "avatars",
      id: "author",
    }
  );
});

test("registers and logs in using the frontend auth endpoints", async () => {
  const credentials = { email: "new@example.com", password: "Password123!" };
  const registered = await send(authApi.endpoints.register, {
    ...credentials,
    name: "New user",
  });
  expect(registered).toHaveProperty("accessToken");
  expect(registered.user).not.toHaveProperty("password");
  const loggedIn = await send(authApi.endpoints.login, credentials);
  expect(loggedIn.user.id).toBe(registered.user.id);
});

test("refreshes one expired session for concurrent frontend requests and revokes it on logout", async () => {
  const session = await send(authApi.endpoints.login, {
    email: "author@example.com",
    password: "Password123!",
  });
  store.dispatch(
    setUser({ ...session, accessToken: await harness.token("author", -1) })
  );
  await Promise.all([
    send(usersApi.endpoints.getCurrentUser),
    send(articlesApi.endpoints.getReadingList, { page: 0 }),
  ]);
  expect(
    harness.requests.filter(({ path }) => path === "/api/auth/refresh-token")
  ).toHaveLength(1);
  const refresh = localStorage.getItem("refreshToken");
  expect(refresh).not.toBe(session.refreshToken);
  await send(authApi.endpoints.endSession);
  store.dispatch(logout());
  const response = await fetch("http://localhost/api/auth/refresh-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: refresh }),
  });
  expect(response.status).toBe(401);
});

test("changes password without sending the client-only confirmation field", async () => {
  await authenticate();
  await send(usersApi.endpoints.changePassword, {
    currentPassword: "Password123!",
    newPassword: "NewPassword123!",
    confirmPassword: "NewPassword123!",
  });
  await expect(
    send(authApi.endpoints.login, {
      email: "author@example.com",
      password: "Password123!",
    })
  ).rejects.toMatchObject({ status: 401 });
  expect(
    await send(authApi.endpoints.login, {
      email: "author@example.com",
      password: "NewPassword123!",
    })
  ).toHaveProperty("accessToken");
});

test("paginates the tag catalog beyond the first page", async () => {
  await send(tagsApi.endpoints.getTags, { q: "react", page: 6 });
  expect(harness.prisma.tag.findMany.mock.calls[0][0]).toMatchObject({
    skip: 120,
    take: 20,
    where: { name: { contains: "react" } },
    orderBy: [{ articles: { _count: "desc" } }, { id: "asc" }],
  });
});

test.each([
  ["tagList", "not-json"],
  ["tagList", JSON.stringify([{ name: "react", unexpected: true }])],
  ["id", "spoofed-id"],
  ["title", ""],
])(
  "rejects invalid multipart field %s=%s before writing",
  async (field, value) => {
    await authenticate();
    const body = articleBody();
    body.set(field, value);
    await expect(
      send(articlesApi.endpoints.createArticle, body)
    ).rejects.toMatchObject({ status: 400 });
    expect(harness.prisma.article.create).not.toHaveBeenCalled();
  }
);

test("replaces an image and rejects simultaneous replacement and removal", async () => {
  await authenticate();
  const replaced = await send(articlesApi.endpoints.updateArticle, {
    id: "article",
    body: articleBody(png()),
  });
  expect(replaced.image).toBe("https://example.com/upload.png");
  const body = articleBody(png());
  body.set("removeImage", "true");
  await expect(
    send(articlesApi.endpoints.updateArticle, { id: "article", body })
  ).rejects.toMatchObject({ status: 400 });
  expect(harness.cloudinary.uploadImage).toHaveBeenCalledTimes(1);
});

test("accepts a refresh token only once during concurrent rotation", async () => {
  const session = await send(authApi.endpoints.login, {
    email: "author@example.com",
    password: "Password123!",
  });
  const refresh = () =>
    fetch("http://localhost/api/auth/refresh-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: session.refreshToken }),
    });
  const responses = await Promise.all([refresh(), refresh()]);
  expect(responses.map((response) => response.status).sort()).toEqual([
    201, 401,
  ]);
  await Promise.all(responses.map((response) => response.json()));
});
