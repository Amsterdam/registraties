import globalConfig from 'globalConfig'; // eslint-disable-line import/extensions, import/no-unresolved

export const domainName = 'registraties.amsterdam.nl';
export const apiDomainName = 'api.data.amsterdam.nl';

const { HOST } = process.env;
const { HTTPS } = process.env;
const { PORT } = process.env;
const scheme = HTTPS ? 'https' : 'http';

export const defaultConfig = {
  API_ROOT: `https://acc.${apiDomainName}/`,
  ROOT: `${scheme}://${HOST}:${PORT}/`,
  AUTH_ROOT: 'https://acc.api.data.amsterdam.nl/',
};

export const environmentConfig = () => {
  let environment;

  const hostname = window && window.location && window.location.hostname;

  if (hostname === domainName || hostname === `acc.${domainName}`) {
    environment = {
      API_ROOT: `https://${apiDomainName}/`,
      ROOT: `https://${hostname}/`,
      AUTH_ROOT: `https://${apiDomainName}/`,
    };
  } else {
    environment = defaultConfig;
  }

  return environment;
};

const CONFIGURATION = {
  // the configuration based on the domain
  ...environmentConfig(),

  // the external configuration override form environment.conf.json
  ...globalConfig,
};

export default CONFIGURATION;
