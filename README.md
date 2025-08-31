# @abruno/dev-config

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white&style=flat-square)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=black&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square)
![Semantic Release](https://img.shields.io/badge/Semantic%20Release-494949?logo=semanticrelease&logoColor=white&style=flat-square)

Opinionated shared configuration package for my projects. Provides consistent linting, formatting,
TypeScript settings, and release automation across services.

## What it includes

- **ESLint** config with TypeScript support
- **Prettier** formatting rules
- **Commitlint** for commit message consistency
- **TypeScript** base configs
- **semantic-release** setup for automated publishing

## Why

Consistency matters more as projects and teams grow. Instead of duplicating configs across repos, I
maintain them in a single package. This reduces setup friction, keeps standards aligned, and
improves developer experience.

## Quick Start

```sh
npx install-peerdeps -D abruno-dev-config
```

## Configurations

### ESLint

**Base Configuration:**

```js
// eslint.config.js
import config from 'abruno-dev-config/eslint';
export default config;
```

**React/Next.js:**

```js
// eslint.config.js
import reactConfig from 'abruno-dev-config/eslint/react';
export default reactConfig;
```

**Node.js/Express:**

```js
// eslint.config.js
import nodeConfig from 'abruno-dev-config/eslint/node';
export default nodeConfig;
```

**Data Processing/ML:**

```js
// eslint.config.js
import dataProcessingConfig from 'abruno-dev-config/eslint/data-processing';
export default dataProcessingConfig;
```

### TypeScript

```bash
// tsconfig.json
{
  "extends": "abruno-dev-config/tsconfig"
}
```

### Prettier

```js
// .prettierrc.js
import config from 'abruno-dev-config/prettier';
export default config;
```

## Dependencies

Most essential dependencies are included as peer dependencies. For specific configurations, install
these as dev dependencies to keep package sizes smaller:

**React/Next.js:**

```bash
npm i -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y @next/eslint-plugin-next
```

**Node.js/Express:**

```bash
npm i -D eslint-plugin-node
```

## Extending Configurations

You can extend any configuration with custom rules:

```js
// eslint.config.js
import baseConfig from 'abruno-dev-config/eslint/react';

export default [
  ...baseConfig,
  {
    rules: {
      // Your custom rules here
    },
  },
];
```

## TypeScript Path Mapping

```bash
// tsconfig.json
{
  "extends": "abruno-dev-config/tsconfig",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"]
    }
  }
}
```
