/**
 * ESLint configuration for shared TypeScript/JavaScript projects.
 * Extends recommended rules for TypeScript, import sorting, and Prettier integration.
 * @usage Import or extend this config in your project's eslint.config.js.
 */
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import parser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  {
    files: ['**/*.ts', '**/*.js'],
    ignores: ['dist/', 'node_modules/', '*.config.js'],
    languageOptions: {
      parser,
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-console': 'warn',
      'import/order': ['error', { 'newlines-between': 'always' }],
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'warn',
      'import/prefer-default-export': 'off',
      'import/no-default-export': 'warn',
    },
  },
  {
    files: ['*.test.ts', '*.test.tsx', '*.spec.ts', '*.spec.tsx'],
    languageOptions: {
      env: { jest: true },
    },
  },
  // Allow default exports in config files for compatibility with tool CLIs (e.g., Prettier, ESLint, etc.)
  {
    files: ['*.config.js', '.prettierrc.js'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
];
