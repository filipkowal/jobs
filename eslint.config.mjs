import nextPlugin from "@next/eslint-plugin-next";
import nextTypescript from "eslint-config-next/typescript";

// eslint-config-next's full preset (core-web-vitals) pulls in eslint-plugin-react,
// which does not support ESLint 10 yet. Until it does, apply the Next.js plugin
// rules directly and use the typescript-eslint based preset for TS linting.
export default [
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  ...nextTypescript,
  {
    // Pre-existing patterns in the codebase; surfaced as warnings to clean up
    // over time instead of failing the lint run.
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-unsafe-function-type": "warn",
    },
  },
  {
    // CommonJS config files legitimately use require().
    files: ["**/*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "test-results/**",
      "playwright-report/**",
      "next-env.d.ts",
      "schema.ts",
    ],
  },
];
