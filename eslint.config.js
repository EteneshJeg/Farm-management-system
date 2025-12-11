import globals from "globals";
import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default {
  ignores: ["dist"],
  extends: [js.configs.recommended],
  files: ["**/*.{js,jsx}"], // changed from ts/tsx to js/jsx
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    sourceType: "module",
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    // TypeScript-specific rules removed
  },
};
