module.exports = {
  assert: '@hapi/code',
  coverage: true,
  threshold: 98,
  lint: true,
  paths: ["test"],
  leaks: false,
  progress: 2,
  reporter: ['console', 'html'],
  output: ['stdout', './coverage/index.html']
};
