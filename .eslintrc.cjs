// Import the ESLint plugin locally
const eslintPluginExample = require("./eslint-cdk-poc");

module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", eslintPluginExample],
  root: true,
};
