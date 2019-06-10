import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import { GlobalError } from '..';
import { intl } from '../../../../internals/testing/test-utils';
import messages from '../../../translations/nl.json';

describe('containers/GlobalError', () => {
  const intlObj = intl({ messages });

  it('should render showing no error by default', () => {
    const { container } = render(<GlobalError intl={intlObj} />);
    expect(container).toMatchSnapshot();
  });

  it('should render showing an error when defined', () => {
    const props = {
      error: true,
      errorMessage: 'MOCK_ERROR',
      intl: intlObj,
    };
    const { container } = render(<GlobalError {...props} />);
    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild.classList.contains('no-print')).toEqual(true);
  });

  it('should capture click on close button', () => {
    const onClose = jest.fn();
    const props = {
      error: true,
      errorMessage: 'MOCK_ERROR',
      onClose,
      intl: intlObj,
    };

    render(<GlobalError {...props} />);

    const button = document.getElementsByTagName('button')[0];
    fireEvent.click(button);

    expect(onClose).toHaveBeenCalled();
  });
});
