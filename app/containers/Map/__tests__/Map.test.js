import React from 'react';
import { mount } from 'enzyme';
import history from 'utils/history';
import { Provider } from 'react-redux';
import Map from 'components/Map/Loadable';

import MapContainer from '..';
import configureStore from '../../../configureStore';

const store = configureStore({}, history);

describe('containers/Map', () => {
  it('should have props from structured selector', () => {
    const tree = mount(
      <Provider store={store}>
        <MapContainer />
      </Provider>,
    );
    const props = tree.find(Map).props();
    const propNames = Object.keys(props);

    expect(propNames.includes('coordinates')).toEqual(true);
  });
});
