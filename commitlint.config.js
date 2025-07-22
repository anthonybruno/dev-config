export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Enforce a max subject length (72 is a common standard)
    'header-max-length': [2, 'always', 72],
    // Custom rule: require at least two words in the subject
    'subject-min-words': [2, 'always', 2],
  },
  plugins: [
    {
      rules: {
        'subject-min-words': ({ header }) => {
          // Remove type and optional scope (e.g., "feat(ui): ")
          const subject = header.replace(/^[a-z]+(\([^)]+\))?:\s*/i, '');
          // Count words (words are separated by spaces)
          const wordCount = subject.trim().split(/\s+/).filter(Boolean).length;
          return [
            wordCount >= 2,
            'The subject must contain at least two words.',
          ];
        },
      },
    },
  ],
};
