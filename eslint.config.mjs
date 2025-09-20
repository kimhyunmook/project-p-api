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

  // 기본 ESLint 권장 설정 (타입 체킹 비활성화: TS 진단 과민 반응 방지)
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
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
        // 타입 인식(프로젝트 기반) 비활성화 → TS 진단을 ESLint에서 미노출
        projectService: false,
      },
    },

    rules: {
      // 🚫 존재하지 않는 파일/모듈 import 시 에러
      "import/no-unresolved": ["error", { commonjs: true, caseSensitive: true }],
      // ✅ Prettier 규칙: OS별 EOL 허용하여 ␍ 경고 완화
      "prettier/prettier": ["error", { endOfLine: "auto" }],

      // ✅ Windows/복붙 시 CRLF 섞여도 보고하지 않음
      "linebreak-style": "off",

      // ✅ 타입 안정성 관련 (기본적으로 켜두지만 상황에 따라 완화)
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",

      // ❌ 불필요하거나 불편한 규칙 끔
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/require-await": "off",
    },
  },
);
