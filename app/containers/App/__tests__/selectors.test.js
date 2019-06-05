import {
  makeSelectAccessToken,
  makeSelectError,
  makeSelectErrorMessage,
  makeSelectIsAuthenticated,
  makeSelectLoading,
  makeSelectLocation,
  makeSelectProgress,
  makeSelectStatus,
  makeSelectUserName,
  selectGlobal,
  selectRoute,
} from '../selectors';

describe('containers/App/selectors', () => {
  it('should select the global state', () => {
    const globalState = {};
    const mockedState = {
      global: globalState,
    };
    expect(selectGlobal(mockedState)).toEqual(globalState);
  });

  it('should select the global progress', () => {
    const progress = { current: 123, max: 456 };
    const mockedState = {
      global: {
        progress,
      },
    };

    expect(makeSelectProgress(mockedState)).toEqual(progress);
  });

  it('should select the global status', () => {
    const status = 'some status right here';
    const mockedState = {
      global: {
        status,
      },
    };
    expect(makeSelectStatus(mockedState)).toEqual(status);
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

  it('should select the error message', () => {
    const errorMessage = 'Something went horribly wrong';
    const mockedState = {
      global: {
        errorMessage,
      },
    };
    expect(makeSelectErrorMessage(mockedState)).toEqual(errorMessage);
  });

  it('should select the location', () => {
    const route = {
      location: { pathname: '/foo' },
    };
    const mockedState = {
      route,
    };

    expect(makeSelectLocation()).toEqual(selectRoute().location);
    expect(makeSelectLocation(mockedState)).toEqual(route.location);
  });

  it('should select the authenticated status', () => {
    const accessToken = 'foobarbaz';
    const mockedState = {
      global: {
        accessToken,
      },
    };
    const mockedStateNoToken = {
      global: {
        accessToken: undefined,
      },
    };

    expect(makeSelectIsAuthenticated(mockedStateNoToken)).toEqual(false);
    expect(makeSelectIsAuthenticated(mockedState)).toEqual(true);
  });
});
