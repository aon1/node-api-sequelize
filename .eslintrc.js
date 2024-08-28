module.exports = {
  root: true,
  extends: 'airbnb-base',
  env: {
    node: true,
  },
  rules: {
    'object-curly-newline': 0,
    'no-prototype-builtins': 0,
    'max-len': ['error', { code: 200 }],
    'no-restricted-syntax': 0,
    'no-underscore-dangle': 0,
  },
};
