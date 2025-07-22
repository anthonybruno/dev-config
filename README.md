# abruno-dev-config

[![Prettier](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg?style=flat&logo=prettier)](https://prettier.io/)
[![ESLint](https://img.shields.io/badge/lint-eslint-4B32C3?logo=eslint)](https://eslint.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![semantic-release](https://img.shields.io/badge/semantic--release-automated%20releases-brightgreen?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

A collection of shareable setups for common development tools like ESLint, Prettier, Commitlint,
TypeScript, and logging. Provides a consistent and standardized development experience across
projects.

## Philosophy & Team Impact

Standardized, modern tooling and clear documentation help teams move faster, onboard quickly, and
maintain high code quality. This setup reduces friction in code review, improves collaboration, and
enables engineers to focus on delivering value. The conventions and structure are designed for
scalability, maintainability, and ease of adoption across a variety of project types.

- **Accelerates onboarding** for new engineers
- **Ensures code quality and consistency** across teams and projects
- **Reduces friction** in code review and collaboration
- **Enables teams to focus on delivering value**

## Table of Contents

- [Quick Install](#quick-install)
- [Types of Projects Supported](#types-of-projects-supported)
- [Usage](#usage)
  - [ESLint](#eslint)
  - [TypeScript](#typescript)
  - [Prettier](#prettier)
  - [Logger](#logger)
  - [Commitlint](#commitlint)

## Quick Install

Install the config package and all required peer dependencies in your project:

```sh
npm install --save-dev abruno-dev-config eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-import eslint-plugin-simple-import-sort eslint-config-prettier
```

> **Note:** ESLint requires that plugins and parsers be installed in your project's own
> `node_modules`. These are listed as `peerDependencies` in this package.

## Types of Projects Supported

- Node.js (including ESM)
- TypeScript (strict mode, modern features)
- React (including Next.js)
- Monorepos (Yarn/NPM workspaces)
- API servers and backend services
- Full-stack JavaScript/TypeScript projects
- Any project that benefits from standardized linting, formatting, and commit conventions

## Usage

### ESLint

Provides comprehensive linting for JavaScript, TypeScript, React, and Node.js projects. Enforces
best practices, code style, and import sorting.

**Features:**

- Opinionated, modern linting rules
- TypeScript and JavaScript support
- Import sorting and grouping
- Easily extendable for project-specific needs

**How to use:**

1. Create or update your `eslint.config.js`:

   ```js
   import config from 'abruno-dev-config/eslint-config';

   export default [
     ...config,
     // Add project-specific overrides or configuration here
   ];
   ```

2. (Optional) For type-aware rules, set `parserOptions.project`:

   ```js
   export default [
     ...config,
     {
       parserOptions: {
         project: './tsconfig.json',
       },
     },
   ];
   ```

### TypeScript

Provides a base `tsconfig.json` for modern TypeScript projects, supporting ESM, Node.js, React, and
path aliases.

**Features:**

- Modern ESM settings: `"module": "ESNext"`, `"moduleResolution": "NodeNext"`
- Path alias: `@/` → `src/`
- No JSX/React-specific options (add in your project if needed)
- No `rootDir` enforced for flexibility

**How to use:**

1. Extend the base config in your `tsconfig.json`:

   ```json
   {
     "extends": "abruno-dev-config/tsconfig"
   }
   ```

2. Add project-specific overrides as needed.

### Prettier

Ensures consistent code formatting across JavaScript, TypeScript, React, Node.js, Markdown, JSON,
CSS, and HTML files.

**Features:**

- Standard Prettier rules for all major file types
- Automatic Tailwind CSS class sorting
- File-specific formatting rules
- No extra plugins needed—everything is bundled

**How to use:**

1. Extend the setup in your project’s `.prettierrc.js`:

   ```js
   module.exports = require('abruno-dev-config/prettier/.prettierrc.js');
   ```

2. Format your code:

   ```sh
   npx prettier --write .
   ```

### Logger

Provides a simple, production-ready logger for Node.js, Express, Next.js, and other
JavaScript/TypeScript projects.

**Features:**

- Colorized, human-readable logs in development
- JSON-formatted logs in production
- Includes timestamp and service name in every log
- Supports log levels: info, warn, error, debug
- Log level controlled by the `LOG_LEVEL` environment variable

**How to use:**

1. Import and create a logger instance:

   ```js
   import { createLogger } from 'abruno-dev-config/logger';

   const logger = createLogger({ serviceName: 'my-service' });
   ```

2. Log messages at different levels:

   ```js
   logger.info('Server started');
   logger.warn('Low disk space');
   logger.error('Unhandled exception', { error });
   logger.debug('Debug details', { data: { foo: 'bar' } });
   ```

### Commitlint

Enforces conventional commit messages for clarity and consistency.

**Features:**

- Enforces conventional commit types (e.g., `feat:`, `fix:`, `chore:`)
- Commit subject must be no longer than 72 characters
- Commit subject must contain at least two words (after the type/scope)

**How to use:**

1. Create or update your `commitlint.config.js`:

   ```js
   module.exports = require('abruno-dev-config/commitlint.config');
   ```

2. Write commit messages following the enforced style:
   - `feat: add user login page`
   - `fix(api): handle empty request body`
