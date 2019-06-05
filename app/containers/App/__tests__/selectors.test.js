import {
  selectGlobal,
  makeSelectUserName,
  makeSelectAccessToken,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocation,
} from '../selectors';

describe('containers/App/selectors', () => {
  it('should select the global state', () => {
    const globalState = {};
    const mockedState = {
      global: globalState,
    };
    expect(selectGlobal(mockedState)).toEqual(globalState);
  });

  it('should select the current user', () => {
    const username = 'loggedInUser';
    const mockedState = {
      global: {
        userName: username,
      },
    };
    expect(makeSelectUserName(mockedState)).toEqual(username);
  });

  it('should select the token', () => {
    const accessToken = 'thisistheaccesstoken';
    const mockedState = {
      global: {
        accessToken,
      },
    };
    expect(makeSelectAccessToken(mockedState)).toEqual(accessToken);
  });

  it('should select the loading', () => {
    const loading = false;
    const mockedState = {
      global: {
        loading,
      },
    };
    expect(makeSelectLoading(mockedState)).toEqual(loading);
  });

  it('should select the error', () => {
    const error = 404;
    const mockedState = {
      global: {
        error,
      },
    };
    expect(makeSelectError(mockedState)).toEqual(error);
  });

  it('should select the location', () => {
    const route = {
      location: { pathname: '/foo' },
    };
    const mockedState = {
      route,
    };
    expect(makeSelectLocation(mockedState)).toEqual(route.location);
  });
});
