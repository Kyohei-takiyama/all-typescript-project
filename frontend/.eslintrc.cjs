module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    camelcase: ["error", { properties: "never" }], // プロパティ名に限ってはキャメルケースを強制しない設定
    semi: ["error", "always"],
    "@typescript-eslint/explicit-module-boundary-types": "error",
  },
}
