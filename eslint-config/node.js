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

const loadPlugin = async (pluginName) => {
  try {
    return (await import(pluginName)).default;
  } catch {
    console.warn(`${pluginName} not found. Related rules will be disabled.`);
    return null;
  }
};

const [nodePlugin] = await Promise.all([loadPlugin('eslint-plugin-node')]);

const nodeRules = nodePlugin
  ? {
    'node/no-unsupported-features/es-syntax': 'error',
    'node/no-missing-import': 'error',
    'node/no-process-exit': 'off', // Allow in server environments
    'node/no-unpublished-require': 'error',
    'node/no-deprecated-api': 'warn',
    'node/no-callback-literal': 'error',
    'node/no-path-concat': 'error',
    'node/no-sync': 'error',
    'node/no-new-require': 'error',
    'node/no-mixed-requires': 'error',
    'node/no-process-env': 'warn',
    'node/global-require': 'error',
  }
  : {};

const serverRules = {
  // Server-specific async/await patterns
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/await-thenable': 'error',
  '@typescript-eslint/no-misused-promises': 'error',
  '@typescript-eslint/require-await': 'error',
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
    plugins: {
      ...(nodePlugin && { node: nodePlugin }),
    },
    rules: {
      ...nodeRules,
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
