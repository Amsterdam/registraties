import React from 'react';
import { mount } from 'enzyme';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import history from 'utils/history';
import { Provider } from 'react-redux';

import { LOAD_DATA_PENDING, LOAD_DATA_FAILED } from 'containers/App/constants';

import ProgressContainer, { ProgressContainerComponent } from '..';
import messages from '../../../translations/nl.json';
import configureStore from '../../../configureStore';

const store = configureStore({}, history);

jest.mock('components/Progress', () => jest.requireActual('components/Progress'));

describe('containers/Progress', () => {
  it('should have props from structured selector', () => {
    const tree = mount(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <ProgressContainer />
        </IntlProvider>
      </Provider>,
    );

    expect(tree.find(ProgressContainerComponent)).not.toBeUndefined();

    const props = tree.find(ProgressContainerComponent).props();
    const propNames = Object.keys(props);

    expect(propNames.includes('progress')).toEqual(true);
    expect(propNames.includes('status')).toEqual(true);
    expect(Object.keys(props.progress)).toEqual(['current', 'max']);
  });

  it('should handle LOAD_DATA_FAILED status', () => {
    const progress = {
      current: 1,
      max: 10,
    };
    const { container, rerender, queryByText } = render(
      <ProgressContainerComponent progress={progress} status={LOAD_DATA_PENDING} />,
    );

    expect(container.firstChild.classList.contains('finished')).toEqual(false);
    expect(queryByText('10 %')).not.toBeNull();

    rerender(<ProgressContainerComponent progress={progress} status={LOAD_DATA_FAILED} />);

    expect(container.firstChild.classList.contains('finished')).toEqual(true);
    expect(queryByText('100 %')).not.toBeNull();
  });
});
