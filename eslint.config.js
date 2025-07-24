import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import pluginSecurity from "eslint-plugin-security";
export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    plugins: {
      js,
      security: pluginSecurity,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginSecurity.configs.recommended.rules, // ✅ security rules here
    },
  },
]);
