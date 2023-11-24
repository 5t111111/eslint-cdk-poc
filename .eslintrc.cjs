module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "eslint-cdk-poc"],
  root: true,
  rules: {
    "eslint-cdk-poc/no-process-node-env": "error",
  },
};
