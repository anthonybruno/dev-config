# Dev Config

Modern ESLint, TypeScript, and Prettier configurations for TypeScript/JavaScript development. Built
for solo developers and small teams who value clean, maintainable code.

## Quick Start

```sh
npx install-peerdeps -D abruno-dev-config
```

## Features

- **TypeScript** with strict type checking
- **Import organization** with automatic sorting
- **Accessibility rules** for React projects
- **Security best practices** (no-eval, no-implied-eval)
- **Modern patterns** (nullish coalescing, optional chaining)
- **Zero conflicts** with Prettier

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
