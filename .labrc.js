module.exports = {
  assert: '@hapi/code',
  coverage: true,
  threshold: 100,
  lint: true,
  paths: ["test"],
  leaks: false,
  progress: 2,
  reporter: ['console', 'lcov'],
  output: ['stdout', 'lcov.info']
};
