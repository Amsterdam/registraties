const webdriver = require('selenium-webdriver');
const browserstack = require('browserstack-local');

const config_file = `../../conf/${process.env.CONFIG_FILE || 'single'}.conf.js`;
const { config } = require(config_file);

const username = process.env.BROWSERSTACK_USERNAME || config.user;
const accessKey = process.env.BROWSERSTACK_ACCESS_KEY || config.key;

const createBrowserStackSession = function(config, caps) {
  return new webdriver.Builder()
    .usingServer(`http://${config.server}/wd/hub`)
    .withCapabilities(caps)
    .build();
};

const myHooks = function() {
  let bs_local = null;

  this.Before(function(scenario, callback) {
    const world = this;
    const task_id = parseInt(process.env.TASK_ID || 0);
    const caps = config.capabilities[task_id];
    caps['browserstack.user'] = username;
    caps['browserstack.key'] = accessKey;

    if (caps['browserstack.local']) {
      // Code to start browserstack local before start of test and stop browserstack local after end of test
      bs_local = new browserstack.Local();
      bs_local.start({ key: accessKey }, function(error) {
        if (error) return console.log(error.red);

        world.driver = createBrowserStackSession(config, caps);
        callback();
      });
    } else {
      world.driver = createBrowserStackSession(config, caps);
      callback();
    }
  });

  this.After(function(scenario, callback) {
    this.driver.quit().then(function() {
      if (bs_local) {
        bs_local.stop(callback);
      } else callback();
    });
  });
};

module.exports = myHooks;
