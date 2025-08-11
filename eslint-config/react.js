/**
 * ESLint configuration for React/Next.js projects.
 *
 * This configuration extends the base TypeScript config with React specific rules,
 * Next.js optimizations, and accessibility standards. Designed for solo developers
 * building modern React applications with a focus on accessibility and performance.
 *
 * @usage Import this config in your React/Next.js project's eslint.config.js.
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

const [reactPlugin, reactHooksPlugin, jsxA11yPlugin, nextPlugin] =
  await Promise.all([
    loadPlugin('eslint-plugin-react'),
    loadPlugin('eslint-plugin-react-hooks'),
    loadPlugin('eslint-plugin-jsx-a11y'),
    loadPlugin('@next/eslint-plugin-next'),
  ]);

// Core React rules
const reactRules = reactPlugin && {
  'react/jsx-key': 'error',
  'react/jsx-no-duplicate-props': 'error',
  'react/jsx-no-target-blank': 'error',
  'react/jsx-no-undef': 'error',
  'react/jsx-pascal-case': 'error',
  'react/jsx-no-useless-fragment': 'error',
  'react/jsx-curly-brace-presence': [
    'error',
    { props: 'never', children: 'never' },
  ],
  'react/jsx-boolean-value': ['error', 'never'],
  'react/self-closing-comp': 'error',
  'react/jsx-closing-bracket-location': 'error',
  'react/jsx-closing-tag-location': 'error',
  'react/jsx-indent-props': ['error', 2],
  'react/jsx-indent': ['error', 2],
  'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
  'react/jsx-first-prop-new-line': ['error', 'multiline'],
  'react/jsx-wrap-multilines': 'error',
  'react/jsx-props-no-multi-spaces': 'error',
  'react/jsx-props-no-spreading': 'warn',
  'react/jsx-no-bind': 'warn',
  'react/jsx-no-leaked-render': 'error',
};

const hooksRules = reactHooksPlugin && {
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'warn',
};

// Essential accessibility rules
const a11yRules = jsxA11yPlugin && {
  'jsx-a11y/alt-text': 'error',
  'jsx-a11y/anchor-is-valid': 'error',
  'jsx-a11y/click-events-have-key-events': 'error',
  'jsx-a11y/html-has-lang': 'error',
  'jsx-a11y/label-has-associated-control': 'error',
  'jsx-a11y/no-static-element-interactions': 'error',
  'jsx-a11y/aria-props': 'error',
  'jsx-a11y/aria-proptypes': 'error',
  'jsx-a11y/aria-unsupported-elements': 'error',
  'jsx-a11y/role-has-required-aria-props': 'error',
  'jsx-a11y/role-supports-aria-props': 'error',
  'jsx-a11y/tabindex-no-positive': 'error',
  'jsx-a11y/no-distracting-elements': 'error',
};

// Next.js specific rules
const nextRules = nextPlugin && {
  '@next/next/no-html-link-for-pages': 'error',
  '@next/next/no-img-element': 'error',
  '@next/next/no-sync-scripts': 'error',
  '@next/next/no-typos': 'error',
  '@next/next/no-css-tags': 'error',
  '@next/next/no-head-element': 'error',
  '@next/next/no-page-custom-font': 'error',
  '@next/next/no-styled-jsx-in-document': 'error',
  '@next/next/no-title-in-document-head': 'error',
  '@next/next/no-duplicate-head': 'error',
  '@next/next/no-document-import-in-page': 'error',
  '@next/next/google-font-display': 'error',
  '@next/next/google-font-preconnect': 'error',
  '@next/next/inline-script-id': 'error',
  '@next/next/next-script-for-ga': 'error',
  '@next/next/no-assign-module-variable': 'error',
  '@next/next/no-async-client-component': 'error',
  '@next/next/no-head-import-in-document': 'error',
  '@next/next/no-script-component-in-head': 'error',
  '@next/next/no-unwanted-polyfillio': 'error',
};

const reactConfig = [
  ...baseConfig,

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    ignores: [
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/node_modules/**',
      '**/*.config.js',
      '**/*.config.ts',
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      ...(reactPlugin && { react: reactPlugin }),
      ...(reactHooksPlugin && { 'react-hooks': reactHooksPlugin }),
      ...(jsxA11yPlugin && { 'jsx-a11y': jsxA11yPlugin }),
      ...(nextPlugin && { '@next/next': nextPlugin }),
    },
    settings: {
      ...(reactPlugin && { react: { version: 'detect' } }),
    },
    rules: {
      ...reactRules,
      ...hooksRules,
      ...a11yRules,
      ...nextRules,
    },
  },

  // React component file overrides
  {
    files: [
      '**/*.component.tsx',
      '**/*.component.jsx',
      '**/*.page.tsx',
      '**/*.page.jsx',
      '**/*.layout.tsx',
      '**/*.layout.jsx',
    ],
    rules: {
      // Component-specific rules can be added here if needed
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

export default reactConfig;
