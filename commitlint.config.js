/**
 * Commitlint configuration for conventional commits.
 * Enforces consistent commit message format.
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 72],
  },
};
