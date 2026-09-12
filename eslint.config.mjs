import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/**", "work/**", "node_modules/**"] },
  { ...eslint.configs.recommended, files: ["scripts/*.mjs", "eslint.config.mjs"] },
  { files: ["main.js", "dev.user.js"], rules: { "no-unreachable": "error", "no-dupe-args": "error", "no-dupe-keys": "error", "no-constant-binary-expression": "error" } },
  { files: ["src/app.ts", "src/media-types.ts", "src/browser.d.ts"],
    languageOptions: { parser: tseslint.parser },
    rules: { "no-unreachable": "error", "no-dupe-args": "error", "no-dupe-keys": "error", "no-constant-binary-expression": "error" } },
  ...tseslint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: ["src/dev*.ts", "src/gm.d.ts", "tests/**/*.ts"],
  })),
  {
    files: ["src/dev*.ts", "src/gm.d.ts", "tests/**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "no-undef": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }],
    },
  },
  {
    files: ["scripts/*.mjs", "eslint.config.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        Buffer: "readonly",
        console: "readonly",
        process: "readonly",
        performance: "readonly",
      },
    },
  },
);
