/**
 * Prettier configuration for consistent code formatting across projects.
 * Includes Tailwind CSS plugin and file-specific overrides.
 * @usage Require or extend this config in your project's .prettierrc.js.
 */
const config = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
  quoteProps: 'as-needed',
  endOfLine: 'lf',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx', 'cn', 'tw'],
  overrides: [
    {
      files: '*.md',
      options: {
        printWidth: 100,
        proseWrap: 'always',
      },
    },
    {
      files: '*.json',
      options: {
        printWidth: 100,
      },
    },
    {
      files: '*.css',
      options: { printWidth: 100 },
    },
    {
      files: '*.html',
      options: { printWidth: 100 },
    },
  ],
};

export default config;
