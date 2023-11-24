module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:cdk-poc/all",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "cdk-poc"],
  root: true,
};
