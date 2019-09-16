import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import 'jest-styled-components';

import GlobalError from '..';

const props = {
  errorMessageLabel: 'Whoops! Something went wrong here...',
  closeLabel: 'Close',
  feedbackLabel: 'Provide us with feedback',
};

describe('components/GlobalError', () => {
  it('matches the snapshot', () => {
    const { container } = render(<GlobalError {...props} />);

    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild.classList.contains('no-print')).toEqual(true);
    expect(container.getElementsByTagName('button')).toHaveLength(1);

    Array.from(container.getElementsByTagName('svg')).forEach(svgElement => {
      expect(svgElement.getAttribute('focusable')).toEqual('false');
    });
  });

  it('handles click for report dialog', () => {
    const showReportDialog = jest.fn();

    const { container, getByTestId } = render(<GlobalError {...props} showReportDialog={showReportDialog} />);

    expect(container.getElementsByTagName('button')).toHaveLength(2);

    fireEvent.click(getByTestId('globalerror-showReportDialog'));

    expect(showReportDialog).toHaveBeenCalled();
  });
});
