import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginTS from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  // Configuração para arquivos TypeScript / TSX
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      "@typescript-eslint": eslintPluginTS,
      react: eslintPluginReact,
    },
    rules: {
      // Regras TypeScript
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",

      // Regras React
      "react/jsx-uses-react": "off",       // não precisa mais no React 17+
      "react/react-in-jsx-scope": "off",   // não precisa mais no React 17+
      "react/prop-types": "off"            // opcional, se não usar PropTypes
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  },

  // Configuração para arquivos JavaScript / JSX
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react: eslintPluginReact,
    },
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off"
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  }
];
