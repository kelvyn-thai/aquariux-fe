import { FlatCompat } from "@eslint/eslintrc";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:storybook/recommended",
    "plugin:import/typescript"
  ),
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    settings: {
      "import/resolver": {
        // You will also need to install and configure the TypeScript resolver
        // See also https://github.com/import-js/eslint-import-resolver-typescript#configuration
        typescript: true,
        node: true,
      },
    },
    plugins: {
      "jsx-a11y": jsxA11y,
      "react-hooks": reactHooks, // Added globally ✅
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "react/display-name": "off", // ✅ Turn off display name rule

      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/no-autofocus": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/heading-has-content": "warn",

      // ✅ React Hooks rules (moved to main rule block)
      "react-hooks/rules-of-hooks": "error", // Ensures hooks are used correctly
      "react-hooks/exhaustive-deps": "warn", // Ensures dependencies in `useEffect` are correct

      // ✅ Circular dependency detection
      "import/no-cycle": ["error", { maxDepth: 1 }], // Prevents circular imports
      "import/order": "off",
    },
  },
];

export default eslintConfig;
