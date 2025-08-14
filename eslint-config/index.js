/**
 * ESLint configuration for modern TypeScript/JavaScript projects.
 *
 * This configuration enforces essential best practices for front-end development,
 * focusing on maintainability, code quality, and developer productivity.
 * Designed for solo developers and small teams who value clean, maintainable code.
 *
 * @usage Import or extend this config in your project's eslint.config.js.
 */

const loadPlugin = async (pluginName) => {
  try {
    return (await import(pluginName)).default;
  } catch {
    console.warn(
      `${pluginName} not found. Refer to the README for information on how to install the plugin.`,
    );
    return null;
  }
};

const [typescriptEslint, typescriptParser, importPlugin] = await Promise.all([
  loadPlugin('@typescript-eslint/eslint-plugin'),
  loadPlugin('@typescript-eslint/parser'),
  loadPlugin('eslint-plugin-import'),
]);

// Core TypeScript rules for modern development
const typescriptRules = typescriptEslint && {
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports',
      disallowTypeAnnotations: false,
    },
  ],
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
    },
  ],
  '@typescript-eslint/no-explicit-any': 'error',

  '@typescript-eslint/no-non-null-assertion': 'error',
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/await-thenable': 'error',
  '@typescript-eslint/no-misused-promises': 'error',
  '@typescript-eslint/require-await': 'error',
  '@typescript-eslint/no-unnecessary-type-assertion': 'error',

  '@typescript-eslint/no-unnecessary-condition': 'error',
  '@typescript-eslint/consistent-return': 'error',
  '@typescript-eslint/no-empty-function': 'error',
  '@typescript-eslint/no-inferrable-types': 'error',
  '@typescript-eslint/no-var-requires': 'error',
  '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: 'interface',
      format: ['PascalCase'],
      custom: {
        regex: '^I[A-Z]',
        match: false,
      },
    },
    {
      selector: 'typeAlias',
      format: ['PascalCase'],
    },
    {
      selector: 'enum',
      format: ['PascalCase'],
    },
  ],
};

// Essential code style and quality rules
const baseRules = {
  'no-console': [
    'warn',
    {
      allow: ['warn', 'error'],
    },
  ],
  'no-debugger': 'error',
  semi: ['error', 'always'],
  quotes: ['error', 'single', { avoidEscape: true }],
  'comma-dangle': ['error', 'always-multiline'],
  'prefer-const': 'error',
  'prefer-template': 'error',
  'object-shorthand': 'error',
  'prefer-destructuring': ['error', { array: true, object: true }],
  'prefer-arrow-callback': 'error',
  'no-duplicate-imports': 'error',
  'no-unused-expressions': 'error',
  'no-eval': 'error',
  'no-implied-eval': 'error',
  'no-alert': 'error',
  'max-lines-per-function': ['warn', 50],
  'max-params': ['warn', 4],
  'no-nested-ternary': 'warn',
};

// Import organization rules
const importRules = importPlugin && {
  'import/order': [
    'error',
    {
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
        'type',
      ],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
      pathGroups: [
        {
          pattern: 'react',
          group: 'external',
          position: 'before',
        },
        {
          pattern: '@/**',
          group: 'internal',
          position: 'after',
        },
      ],
    },
  ],
  'import/no-duplicates': 'error',
  'import/no-unresolved': 'warn',
  'import/prefer-default-export': 'off',
  'import/no-default-export': 'warn',
  'import/extensions': [
    'error',
    'ignorePackages',
    {
      js: 'never',
      ts: 'never',
      tsx: 'never',
    },
  ],
  'import/no-commonjs': 'error',
  'import/no-cycle': 'error',
};

// Code formatting rules
const formattingRules = {
  'arrow-parens': ['error', 'always'],
  'object-curly-spacing': ['error', 'always'],
  'array-bracket-spacing': ['error', 'never'],
  'no-trailing-spaces': 'error',
  'eol-last': 'error',
  'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
  'no-tabs': 'error',
  'linebreak-style': ['error', 'unix'],
  'max-len': [
    'warn',
    {
      code: 100,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    },
  ],
};

const baseConfig = [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '.next/**',
      '*.d.ts',
      'package-lock.json',
      'yarn.lock',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        tsconfigRootDir: process.cwd(),
        project: './tsconfig.json',
      },
    },
    plugins: {
      ...(typescriptEslint && { '@typescript-eslint': typescriptEslint }),
      ...(importPlugin && { import: importPlugin }),
    },
    rules: {
      ...(typescriptRules || {}),
      ...baseRules,
      ...(importRules || {}),
      ...formattingRules,
    },
  },

  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    plugins: {
      ...(importPlugin && { import: importPlugin }),
    },
    rules: {
      ...baseRules,
      ...(importRules || {}),
      ...formattingRules,
    },
  },

  {
    files: ['*.test.ts', '*.test.tsx', '*.spec.ts', '*.spec.tsx'],
    languageOptions: {
      env: { jest: true },
    },
    rules: {
      'no-console': 'off',
      ...(typescriptEslint && { '@typescript-eslint/no-explicit-any': 'off' }),
      'max-lines-per-function': 'off',
    },
  },

  {
    files: [
      '*.config.js',
      '.prettierrc.js',
      'eslint-config/index.js',
      'eslint-config/*.js',
      'prettier/.prettierrc.js',
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      'import/no-default-export': 'off',
      'no-console': 'off',
      'import/extensions': 'off',
    },
  },
];

export default baseConfig;
