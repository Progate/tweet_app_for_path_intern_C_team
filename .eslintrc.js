/* eslint-env node */
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: ["node"],
  rules: {
    // Show error on no explicit return type to prevent from missing `FC` or
    // unexpected bugs. It's sometimes tedious when the type is complicated
    // and relying on type inference is a good idea, so ignore no return types
    // for functions used as expressions.
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true,
      },
    ],
    "@typescript-eslint/array-type": [
      "error",
      {
        default: "array-simple",
        readonly: "array-simple",
      },
    ],
    camelcase: "error",
  },
};
