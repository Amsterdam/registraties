import * as accessTokenParser from './services/access-token-parser/access-token-parser';
import * as stateTokengenerator from './services/state-token-generator/state-token-generator';
import * as auth from './auth';

const state = '3KjvlbwUDIoVe8sLvxPq8w==';
const accessToken =
  'eyJhbGciOiJFUzI1NiIsImtpZCI6ImU1MDJjOGYzLTNkOGEtNDBiMy1hYjZjLTEyOTQ4MzMyYWU5YyJ9.eyJpc3MiOiJodHRwczovL2FjYy5hcGkuZGF0YS5hbXN0ZXJkYW0ubmwvb2F1dGgyL2F1dGhvcml6ZSIsInN1YiI6Ik1lZGV3ZXJrZXIiLCJpYXQiOjE1NjA4NjAzNzAsIm5iZiI6MTU2MDg2MDM2MCwiZXhwIjoxNTYwODk2MzcwLCJqdGkiOiJlNGE4ZTkwNy1kNDY1LTQzYzYtOGU2NS0xNzQxMzNlNzAyOTIiLCJzY29wZXMiOlsiQlJLL1JTIiwiQlJLL1JPIiwiSFIvUiJdfQ.Bbo3oWMz5bRSVbHKcPZesbM5fM33INMGEY2iXr-uwoa_pcLSm2C5jBTXnDik59oXW5LO3xDaj5ZcSkSDinBCjA';
const params = {
  token_type: 'bearer',
  state,
  scope: 'BRK/RO+HR/R+BRK/RS',
  expires_in: '36000',
  access_token: accessToken,
};

jest.mock('./services/access-token-parser/access-token-parser');
jest.mock('./services/state-token-generator/state-token-generator');

describe('shared/services/auth', () => {
  afterEach(() => {
    sessionStorage.clear();

    jest.resetAllMocks();
  });

  describe('getDomain', () => {
    it('should return the domain name', () => {
      expect(auth.getDomain()).toEqual(auth.domainList[0]);
      expect(auth.getDomain('somedomain.com')).toEqual('somedomain.com');
    });
  });

  describe('encodedScopes', () => {
    it('should return a URI encoded string', () => {
      const { encodedScopes } = auth;

      auth.scopes.forEach(scope => {
        expect(encodedScopes.indexOf(encodeURIComponent(scope))).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('AUTH_PATH', () => {
    it('should return a string that contains domain, client id and scopes', () => {
      const domain = 'somedomain.com';
      const authPath = auth.AUTH_PATH(domain);

      expect(authPath.indexOf(domain)).toBeGreaterThanOrEqual(0);
      expect(authPath.indexOf(auth.clientId)).toBeGreaterThanOrEqual(0);
      expect(authPath.indexOf(auth.encodedScopes)).toBeGreaterThanOrEqual(0);
    });
  });

  describe('handleError', () => {
    const locationAssignSpy = jest.spyOn(window.location, 'assign');

    it('should throw an error', () => {
      expect(() => {
        auth.handleError('invalid_request', 'description goes here');

        expect(sessionStorage.removeItem).toHaveBeenCalledWith(auth.STATE_TOKEN);
        expect(locationAssignSpy).toHaveBeenCalled();
      }).toThrow();
    });

    window.location.assign.mockRestore();
  });

  describe('catchError', () => {
    it('should throw an error', () => {
      // mocking console.error to catch error shown by JSDOM because of the history replace state call
      global.console.error = jest.fn();
      global.history.replaceState({}, '', '/?error=foo&error_description=zork');

      expect(() => {
        auth.catchError();
      }).toThrow();

      global.console.error.mockRestore();
    });

    it('should NOT throw an error', () => {
      global.history.replaceState({}, '', '/');

      expect(() => {
        auth.catchError();
      }).not.toThrow();
    });
  });

  describe('getAccessTokenFromParams', () => {
    it('should return null', () => {
      expect(auth.getAccessTokenFromParams()).toEqual(null);
      expect(auth.getAccessTokenFromParams(undefined)).toEqual(null);
      expect(auth.getAccessTokenFromParams(null)).toEqual(null);
      expect(auth.getAccessTokenFromParams('')).toEqual(null);
      expect(auth.getAccessTokenFromParams(0)).toEqual(null);

      jest.spyOn(sessionStorage, 'getItem').mockImplementation(() => state);

      expect(auth.getAccessTokenFromParams({ ...params, expires_in: undefined })).toEqual(null);
    });

    it('should return access token', () => {
      jest.spyOn(sessionStorage, 'getItem').mockImplementation(() => state);

      expect(auth.getAccessTokenFromParams(params)).toEqual(accessToken);
      expect(sessionStorage.getItem).toHaveBeenCalledWith(auth.STATE_TOKEN);
    });

    it('should throw an error', () => {
      jest.spyOn(sessionStorage, 'getItem').mockImplementation(() => 'nothing');

      expect(() => {
        auth.getAccessTokenFromParams(params);
      }).toThrow(/Authenticator encountered an invalid state token/);
    });
  });

  describe('handleCallback', () => {
    beforeAll(() => {
      // mocking console.error to catch error shown by JSDOM because of the history replace state call
      global.console.error = jest.fn();
    });

    afterAll(() => {
      global.console.error.mockRestore();
    });

    it('should do nothing if there is no access token', () => {
      const paramsWithoutExpires = { ...params };
      delete paramsWithoutExpires.expires_in;

      const hash = Object.keys(paramsWithoutExpires)
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');

      jest.spyOn(sessionStorage, 'getItem').mockImplementationOnce(() => state);

      global.history.replaceState({}, '', `#${hash}`);
      auth.handleCallback();

      expect(sessionStorage.removeItem).not.toHaveBeenCalled();
    });

    it('should set access token in state', () => {
      const returnPath = 'https://localhost:8080/vbo/0363010000940054/';

      jest
        .spyOn(sessionStorage, 'getItem')
        .mockImplementationOnce(() => state)
        .mockImplementationOnce(() => returnPath);

      const hash = Object.keys(params)
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');

      global.history.replaceState({}, '', `#${hash}`);
      auth.handleCallback();

      expect(sessionStorage.setItem).toHaveBeenCalledWith(auth.ACCESS_TOKEN, params.access_token);
      expect(sessionStorage.removeItem).toHaveBeenCalledWith(auth.RETURN_PATH);
      expect(sessionStorage.removeItem).toHaveBeenLastCalledWith(auth.STATE_TOKEN);
    });
  });

  describe('getAccessToken', () => {
    it('should get value from sessionStorage', () => {
      auth.getAccessToken();

      expect(sessionStorage.getItem).toHaveBeenCalledWith(auth.ACCESS_TOKEN);
    });
  });

  describe('getOauthDomain', () => {
    it('should get value from sessionStorage', () => {
      auth.getOauthDomain();

      expect(sessionStorage.getItem).toHaveBeenCalledWith(auth.OAUTH_DOMAIN);
    });
  });

  describe('restoreAccessToken', () => {
    it('should not set tokenData', () => {
      jest.spyOn(sessionStorage, 'getItem').mockImplementation(() => '');
      jest.spyOn(accessTokenParser, 'default');

      auth.restoreAccessToken();

      expect(accessTokenParser.default).not.toHaveBeenCalled();
    });

    it('should get value from accessTokenParser', () => {
      const scopes = ['BRK/RO', 'HR/R', 'BRK/RS'];
      const name = 'Medewerker';
      const tokenData = {
        issuer: 'https://acc.api.data.amsterdam.nl/oauth2/authorize',
        name,
        issuedAt: 1560861221,
        notBefore: 1560861211,
        expiresAt: 1560897221,
        jwtId: '3d4ef3f2-8549-4918-a7f3-2dc541a27798',
        scopes,
      };
      jest.spyOn(sessionStorage, 'getItem').mockImplementation(() => state);
      jest
        .spyOn(accessTokenParser, 'default')
        .mockImplementationOnce(() => ({ ...tokenData, name: 'O.M.G.' }))
        .mockImplementationOnce(() => tokenData);

      // first, change the value of `tokenData` by calling `handleCallback`
      const hash = Object.keys(params)
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');

      global.history.replaceState({}, '', `#${hash}`);
      auth.handleCallback();

      expect(auth.getScopes()).toEqual(params.scope.split('+'));
      expect(auth.getName()).toEqual('O.M.G.');

      auth.restoreAccessToken();

      expect(sessionStorage.getItem).toHaveBeenCalledWith(auth.ACCESS_TOKEN);
      expect(accessTokenParser.default).toHaveBeenCalled();

      expect(auth.getScopes()).toEqual(scopes);
      expect(auth.getName()).toEqual(name);
    });
  });

  describe('login', () => {
    const domain = 'localhost';

    beforeAll(() => {
      jest.spyOn(window.location, 'assign');
    });

    afterAll(() => {
      window.location.assign.mockRestore();
    });

    it('should throw an error', () => {
      jest.spyOn(stateTokengenerator, 'default').mockImplementationOnce(() => '');

      expect(() => {
        auth.login(domain);
      }).toThrow(/crypto library is not available/);
    });

    it('should handle login correctly', () => {
      const stateToken = 'BB4W/JEiBeAt7nB6vgVO+Q==';
      const returnPath = '/vbo/0363010000940054/';

      jest.spyOn(stateTokengenerator, 'default').mockImplementationOnce(() => stateToken);
      global.history.replaceState({}, '', returnPath);

      auth.login(domain);

      expect(sessionStorage.removeItem).toHaveBeenCalledWith(auth.ACCESS_TOKEN);
      expect(sessionStorage.setItem).toHaveBeenNthCalledWith(1, auth.RETURN_PATH, window.location);
      expect(sessionStorage.setItem).toHaveBeenNthCalledWith(2, auth.STATE_TOKEN, stateToken);
      expect(sessionStorage.setItem).toHaveBeenNthCalledWith(3, auth.OAUTH_DOMAIN, domain);

      expect(window.location.assign).toHaveBeenCalledWith(expect.stringContaining(auth.AUTH_PATH(domain)));
      expect(window.location.assign).toHaveBeenCalledWith(expect.stringContaining(encodeURIComponent(stateToken)));
      expect(window.location.assign).toHaveBeenCalledWith(
        expect.stringContaining(encodeURIComponent(`${window.location.protocol}//${window.location.host}/`)),
      );
    });
  });

  describe('logout', () => {
    it('should clear session storage', () => {
      jest.spyOn(window.location, 'reload');
      auth.logout();

      expect(sessionStorage.removeItem).toHaveBeenCalledWith(auth.ACCESS_TOKEN);
      expect(sessionStorage.removeItem).toHaveBeenCalledWith(auth.OAUTH_DOMAIN);
      expect(window.location.reload).toHaveBeenCalled();

      window.location.reload.mockRestore();
    });
  });

  describe('getReturnPath', () => {
    it('should return a string', () => {
      auth.initAuth(); // reset the value of returnPath

      expect(auth.getReturnPath()).toEqual('');

      const returnPath = 'https://localhost:8080/vbo/0363010000940054/';

      jest
        .spyOn(sessionStorage, 'getItem')
        .mockImplementationOnce(() => state)
        .mockImplementationOnce(() => returnPath);

      const hash = Object.keys(params)
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');

      global.history.replaceState({}, '', `#${hash}`);

      auth.handleCallback();

      expect(auth.getReturnPath()).toEqual(returnPath);
    });
  });

  describe('isAuthenticated', () => {
    it('should return a boolean', () => {
      jest
        .spyOn(sessionStorage, 'getItem')
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => '')
        .mockImplementationOnce(() => state);

      expect(auth.isAuthenticated()).toEqual(false);
      expect(auth.isAuthenticated()).toEqual(false);
      expect(auth.isAuthenticated()).toEqual(true);
    });
  });

  describe('getScopes', () => {
    it('should get the default value', () => {
      expect(auth.getScopes()).toEqual([]);
    });
  });

  describe('getName', () => {
    it('should get the default value', () => {
      expect(auth.getName()).toEqual('');
    });
  });

  describe('getAuthHeaders', () => {
    it('should return an object', () => {
      const customAccessToken = 'omgwtfbbq!!!1!';

      jest
        .spyOn(sessionStorage, 'getItem')
        .mockImplementationOnce(() => '')
        .mockImplementationOnce(() => customAccessToken);

      expect(auth.getAuthHeaders()).toEqual({});
      expect(auth.getAuthHeaders()).toEqual(expect.objectContaining({ Authorization: `Bearer ${customAccessToken}` }));
    });
  });

  describe('getRequestOptions', () => {
    it('should return an object', () => {
      const customAccessToken = 'omgwtfbbq!!!1!';

      jest
        .spyOn(sessionStorage, 'getItem')
        .mockImplementationOnce(() => '')
        .mockImplementationOnce(() => customAccessToken);

      expect(auth.getRequestOptions()).toEqual(expect.objectContaining({ headers: {} }));
      expect(auth.getRequestOptions()).toEqual(
        expect.objectContaining({ headers: { Authorization: `Bearer ${customAccessToken}` } }),
      );
    });
  });

  describe('authenticate', () => {
    it('should call initAuth', () => {
      expect(auth.getReturnPath()).not.toBeUndefined();

      auth.authenticate();

      expect(auth.getReturnPath()).toEqual('');
    });

    it('should return null', () => {
      jest.spyOn(sessionStorage, 'getItem').mockImplementation(() => '');

      expect(auth.authenticate()).toEqual(null);
    });

    it('should return credentials', () => {
      jest.spyOn(sessionStorage, 'getItem').mockImplementation(() => state);

      expect(auth.authenticate()).toEqual(
        expect.objectContaining({ accessToken: state, userName: '', userScopes: [] }),
      );
    });
  });
});
