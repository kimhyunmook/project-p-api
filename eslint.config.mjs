// @ts-check
import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import importPlugin from "eslint-plugin-import";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // 무시할 파일들
  {
    ignores: ["eslint.config.mjs"],
  },

  // 기본 ESLint 권장 설정 + 타입 체크 활성화 (존재하지 않는 타입 감지용)
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,

  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: "commonjs",
      parserOptions: {
        // 타입 체크 활성화 (존재하지 않는 타입 감지용)
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        // TypeScript 파일 확장자 허용
        extraFileExtensions: [".ts", ".tsx"],
      },
    },

    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
      "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
    },

    rules: {
      // 🚫 존재하지 않는 파일/모듈 import 시 에러
      "import/no-unresolved": [
        "error",
        {
          commonjs: true,
          caseSensitive: true,
        },
      ],
      // ✅ Prettier 규칙: OS별 EOL 허용하여 ␍ 경고 완화
      "prettier/prettier": ["error", { endOfLine: "auto" }],

      // ✅ Windows/복붙 시 CRLF 섞여도 보고하지 않음
      "linebreak-style": "off",

      // ✅ 타입 안정성 관련 (존재하지 않는 타입 감지용)
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      // 존재하지 않는 타입 감지 활성화
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",

      // ❌ 불필요하거나 불편한 규칙 끔
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/require-await": "off",
    },
  },
);
