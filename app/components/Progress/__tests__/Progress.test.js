import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-styled-components';
import Progress, { Label, smallFactor, removeNode } from '..';
import { progressWidth } from '../styles';

describe('Progress', () => {
  afterEach(cleanup);

  it('matches the snapshot', () => {
    const { container } = render(<Progress />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('applies a scale factor for small variant', () => {
    const { rerender, getByTestId } = render(<Progress />);
    expect(getByTestId('progress-wrapper').firstChild).toHaveStyleRule('height', `${progressWidth}px`);
    expect(getByTestId('progress-wrapper').firstChild).toHaveStyleRule('width', `${progressWidth}px`);

    rerender(<Progress variant="small" />);
    expect(getByTestId('progress-wrapper').firstChild).toHaveStyleRule('height', `${progressWidth * smallFactor}px`);
    expect(getByTestId('progress-wrapper').firstChild).toHaveStyleRule('width', `${progressWidth * smallFactor}px`);
  });

  it('renders the progress element with the primary color', () => {
    const { rerender, getByTestId } = render(<Progress />);

    expect(getByTestId('progress-wrapper').firstChild).toHaveStyleRule('border-color', '#ec0000', {
      modifier: '::before',
    });

    rerender(<Progress hasPrimaryColor={false} />);

    expect(getByTestId('progress-wrapper').firstChild).toHaveStyleRule('border-color', 'currentColor', {
      modifier: '::before',
    });

    rerender(<Progress type="undetermined" />);

    expect(getByTestId('progress-wrapper').firstChild).toHaveStyleRule('color', '#ec0000');

    rerender(<Progress hasPrimaryColor={false} type="undetermined" />);

    expect(getByTestId('progress-wrapper').firstChild).toHaveStyleRule('color', 'currentColor');
  });

  it('renders the progress element as an inline element', () => {
    const { rerender, getByTestId } = render(<Progress />);

    expect(getByTestId('progress-wrapper')).toHaveStyleRule('position', 'fixed');

    rerender(<Progress inline />);

    expect(getByTestId('progress-wrapper')).toHaveStyleRule('position', 'relative');
  });

  it('renders a label', () => {
    const { rerender, getByText, getByTestId } = render(<Progress label="Foo bar" />);

    expect(getByText('Foo bar')).not.toBeUndefined();

    rerender(<Progress label="Foo bar" showLabel={false} />);

    expect(() => {
      getByText('Foo bar');
    }).toThrow();

    rerender(<Progress />);

    expect(getByTestId('progress-label').textContent).toContain(0);
  });

  it('shows the progress percentage', () => {
    const { rerender, getByTestId } = render(<Progress />);

    expect(getByTestId('progress-label').textContent).toBe('0 %');

    rerender(<Progress now={0.15} />);

    expect(getByTestId('progress-label').textContent).toBe('15 %');

    global.console.error = jest.fn();

    rerender(<Progress now={15} />);

    expect(global.console.error).toHaveBeenCalledWith(expect.stringContaining('should be between 0 and 1'));

    global.console.error.mockRestore();
  });

  describe('removeNode', () => {
    it('should add a classname', () => {
      const currentTarget = document.createElement('div');
      currentTarget.classList.add('some-class');

      const event = {
        currentTarget,
      };

      removeNode(event);

      expect(currentTarget.classList).not.toContain('hidden');

      currentTarget.classList.add('finished');

      removeNode(event);

      expect(currentTarget.classList).toContain('hidden');
    });
  });

  describe('label', () => {
    it('should position the label text vertically', () => {
      const { container, rerender } = render(<Label />);

      expect(container.firstChild).toHaveStyleRule('align-self', 'center');

      rerender(<Label vPos="center" />);

      expect(container.firstChild).toHaveStyleRule('align-self', 'center');

      rerender(<Label vPos="top" />);

      expect(container.firstChild).toHaveStyleRule('align-self', 'flex-start');

      rerender(<Label vPos="bottom" />);

      expect(container.firstChild).toHaveStyleRule('align-self', 'flex-end');
    });
  });
});
