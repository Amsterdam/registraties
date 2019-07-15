exports.config = {
  server: 'hub-cloud.browserstack.com',

  capabilities: [
    {
      browserName: 'chrome',
      name: 'single_test',
      build: 'cucumber-js-browserstack',
    },
  ],
};
