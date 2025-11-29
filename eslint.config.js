import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tailwind from "eslint-plugin-tailwindcss";
import globals from "globals";

export default [
    {
        ignores: ["vendor", "node_modules/", "public/", "storage/"],
    },
    {
        files: ["resources/js/**/*.{ts,tsx,js,jsx}"],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {window: "readonly", document: "readonly"},

        },
        plugins: {
            "@typescript-eslint": ts,
            react,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            tailwind,
        },
        settings: {
            react: {
                version: "detect",
            }
        },
        rules: {
            ...js.configs.recommended.rules,
            ...ts.configs["recommended"].rules,
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": "warn",
        }
    }
]
