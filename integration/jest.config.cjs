const path = require("node:path");

const backend = path.resolve(
  process.env.FEEDR_BACKEND_DIR || path.join(__dirname, "../../feedr-backend")
);
const escapedBackend = backend.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

module.exports = {
  rootDir: "..",
  testMatch: ["<rootDir>/integration/**/*.test.cjs"],
  testEnvironment: "node",
  testTimeout: 15000,
  setupFiles: ["<rootDir>/integration/setup.cjs"],
  transformIgnorePatterns: ["node_modules/(?!@nestjs/)"],
  moduleNameMapper: { "^src/(.*)$": `${backend}/src/$1` },
  transform: {
    [`^${escapedBackend}[/\\\\].+\\.[tj]s$`]: [
      require.resolve("@swc/jest", { paths: [backend] }),
      {
        swcrc: false,
        jsc: {
          parser: { syntax: "typescript", decorators: true },
          transform: { legacyDecorator: true, decoratorMetadata: true },
          target: "es2022",
        },
        module: { type: "commonjs" },
      },
    ],
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  globals: { FEEDR_BACKEND_DIR: backend },
};
