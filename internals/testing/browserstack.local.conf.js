exports.config = {
  server: 'hub-cloud.browserstack.com',

  capabilities: [
    {
      browserName: 'chrome',
      name: 'Bstack-[CucumberJS] Local Sample Test',
      'browserstack.local': true,
    },
  ],
};
