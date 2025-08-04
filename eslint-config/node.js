/**
 * ESLint configuration for Node.js/Express projects.
 *
 * This configuration extends the base TypeScript config with Node.js specific rules
 * and modern server-side best practices. Designed for solo developers and small teams
 * building APIs and server applications.
 *
 * @usage Import this config in your Node.js/Express project's eslint.config.js.
 */

import baseConfig from './index.js';

// Modern Node.js/Server rules
const serverRules = {
  // Server-specific async/await patterns
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/await-thenable': 'error',
  '@typescript-eslint/no-misused-promises': 'error',
  '@typescript-eslint/require-await': 'error',

  // Node.js/Express server environment rules
  'no-process-exit': 'off',
  'no-console': 'off',
  'no-sync': 'error',
  'no-path-concat': 'error',
  'no-new-require': 'error',
  'no-mixed-requires': 'error',
  'no-process-env': 'warn',
  'no-global-assign': 'error',
  'no-implied-eval': 'error',
  'no-eval': 'error',
};

const nodeEnvRules = {
  'no-console': 'off',
  'import/no-commonjs': 'off',
};

const nodeConfig = [
  ...baseConfig,

  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      ...serverRules,
      ...nodeEnvRules,
    },
  },

  // Server-specific file overrides
  {
    files: [
      '**/*.service.ts',
      '**/*.route.ts',
      '**/*.middleware.ts',
      '**/*.tool.ts',
      '**/*.util.ts',
      '**/*.helper.ts',
    ],
    rules: {
      '@typescript-eslint/prefer-readonly': 'error',
    },
  },

  // Config file overrides
  {
    files: [
      '*.config.js',
      '*.config.ts',
      '.prettierrc.js',
      'eslint-config/*.js',
      'prettier/.prettierrc.js',
      'jest.config.js',
      'jest.config.ts',
      'webpack.config.js',
      'webpack.config.ts',
      'vite.config.ts',
      'rollup.config.js',
      'rollup.config.ts',
    ],
    rules: {
      'import/no-default-export': 'off',
      'no-console': 'off',
      'import/extensions': 'off',
      'import/no-commonjs': 'off',
    },
  },
];

export default nodeConfig;
