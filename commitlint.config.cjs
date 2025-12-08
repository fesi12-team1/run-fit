const Configuration = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-case': [2, 'always', 'lower-case'],
    'subject-case': [0],
  },
};

module.exports = Configuration;
