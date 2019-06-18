/* eslint-disable global-require */
import { domainName, apiDomainName } from './configuration';

describe('shared/services/configuration', () => {
  const OLD_ENV = process.env;
  const location = JSON.stringify(window.location);
  delete window.location;

  Object.defineProperty(window, 'location', {
    value: JSON.parse(location),
  });

  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    delete process.env.HTTPS;
    delete process.env.PORT;
    delete process.env.HOST;

    process.env = { ...OLD_ENV };
  });

  it('should return a default config object', () => {
    process.env.HTTPS = true;
    process.env.PORT = 8080;
    process.env.HOST = 'localhost';
    const { environmentConfig, defaultConfig } = require('./configuration');

    const config = environmentConfig();

    expect(config).toEqual(defaultConfig);
  });

  it('should return acc config', () => {
    Object.defineProperty(global.location, 'hostname', {
      value: `acc.${domainName}`,
      configurable: true,
    });

    const { environmentConfig } = require('./configuration');

    const config = environmentConfig();

    expect(config.ROOT).toEqual('https://acc.registraties.amsterdam.nl/');
    expect(config.API_ROOT).toEqual(`https://${apiDomainName}/`);
    expect(config.AUTH_ROOT).toEqual(`https://${apiDomainName}/`);
  });

  it('should return prod config', () => {
    Object.defineProperty(global.location, 'hostname', {
      value: domainName,
      configurable: true,
    });

    const { environmentConfig } = require('./configuration');

    const config = environmentConfig();

    expect(config.ROOT).toEqual(`https://${domainName}/`);
    expect(config.API_ROOT).toEqual(`https://${apiDomainName}/`);
    expect(config.AUTH_ROOT).toEqual(`https://${apiDomainName}/`);
  });
});
