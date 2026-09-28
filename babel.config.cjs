module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-typescript",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
  env: {
    test: {
      plugins: [
        ({ types }) => ({
          visitor: {
            MemberExpression(path) {
              const { object, property } = path.node;
              if (object.type === "MetaProperty" && object.meta.name === "import" && property.name === "env") {
                path.replaceWith(types.valueToNode({ VITE_BASE_URL: "http://localhost/api/" }));
              }
            },
          },
        }),
      ],
    },
  },
};
