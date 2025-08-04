/**
 * ESLint configuration for data processing/ML projects.
 *
 * This configuration extends the base TypeScript config with rules
 * specific to data processing, ML pipelines, and RAG systems.
 * Designed for solo developers working with data-intensive applications.
 *
 * @usage Import this config in your data processing project's eslint.config.js.
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

// Data processing specific rules
const dataProcessingRules = {
  // Allow some flexibility for ML/data processing
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/no-non-null-assertion': 'off', // Common in data processing
  'no-console': 'off', // Allow console for data processing logs
  'no-process-exit': 'off', // Allow process exit in data pipelines

  // Async/await patterns for data processing
  'no-await-in-loop': 'off', // Common in data processing
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/await-thenable': 'error',
  '@typescript-eslint/no-misused-promises': 'error',
  '@typescript-eslint/require-await': 'error',

  // Complexity management for data processing
  'max-lines-per-function': ['warn', 100],
  'max-params': ['warn', 6], // Allow more params for data processing
};

// Node.js rules for data processing
const nodeRules = nodePlugin && {
  'node/no-unsupported-features/es-syntax': 'error',
  'node/no-missing-import': 'error',
  'node/no-process-exit': 'off', // Allow in data pipelines
  'node/no-unpublished-require': 'error',
  'node/no-deprecated-api': 'warn',
  'node/no-callback-literal': 'error',
  'node/no-path-concat': 'error',
  'node/no-sync': 'error',
  'node/no-new-require': 'error',
  'node/no-mixed-requires': 'error',
  'node/no-process-env': 'warn',
  'node/global-require': 'error',
  'node/no-buffer-constructor': 'error',
};

const dataProcessingConfig = [
  ...baseConfig,

  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      env: { node: true, es2022: true },
    },
    plugins: {
      ...(nodePlugin && { node: nodePlugin }),
    },
    rules: {
      ...dataProcessingRules,
      ...nodeRules,
    },
  },

  // Data processing specific file overrides
  {
    files: [
      '**/*.service.ts',
      '**/*.processor.ts',
      '**/*.embedding.ts',
      '**/*.pipeline.ts',
      '**/*.chunk.ts',
      '**/*.vector.ts',
      '**/*.rag.ts',
    ],
    rules: {
      'no-console': 'off',
      'no-process-exit': 'off',
      'max-lines-per-function': ['warn', 150], // Longer functions allowed
    },
  },

  // Script files overrides
  {
    files: ['scripts/**/*.ts', 'scripts/**/*.js'],
    rules: {
      'no-console': 'off',
      'no-process-exit': 'off',
      'max-lines-per-function': 'off',
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

export default dataProcessingConfig;
