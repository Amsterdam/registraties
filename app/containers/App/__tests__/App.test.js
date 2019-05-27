import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';

import HeaderContainer from 'containers/Header';
import Footer from 'components/Footer';
import { App } from '../index';

describe('<App />', () => {
  const onAuthenticateUser = jest.fn();
  const showError = jest.fn();

  it.skip('should render the header', () => {
    const renderedComponent = shallow(<App onAuthenticateUser={onAuthenticateUser} showError={showError} />);
    expect(renderedComponent.find(HeaderContainer).length).toBe(1);
  });

  it('should render some routes', () => {
    const renderedComponent = shallow(<App onAuthenticateUser={onAuthenticateUser} showError={showError} />);
    expect(renderedComponent.find(Route).length).not.toBe(0);
  });

  it('should render the footer', () => {
    const renderedComponent = shallow(<App onAuthenticateUser={onAuthenticateUser} showError={showError} />);
    expect(renderedComponent.find(Footer).length).toBe(1);
  });
});
