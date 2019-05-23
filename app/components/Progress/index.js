import React, { useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { determined, undetermined, label as labelStyles } from './styles';

const Wrapper = styled(({ className, children }) => <div className={className}>{children}</div>)`
  ${({ type }) => (type === 'determined' ? determined.Wrapper : undetermined.Wrapper)};
`;

const Pie = styled(({ className }) => <div className={className} />)`
  ${({ type }) => (type === 'determined' ? determined.Pie : undetermined.Pie)};
`;

export const Label = styled.div`
  ${labelStyles}
`;

export const smallFactor = 0.333;

export const removeNode = ({ currentTarget }) => {
  if (currentTarget.classList.contains('finished')) {
    currentTarget.classList.add('hidden');
  }
};

/**
 * Fixed positioned component that indicates (loading) progress
 * Can be used to show page loading progress and will take a value for its `now` prop (between 0 and 1) to update the loader bar.
 */
const Progress = ({ className, label, labelPosition, showLabel, variant, ...props }) => {
  const scaleFactor = variant === 'small' ? smallFactor : 1;
  const progressRef = createRef();

  useEffect(() => {
    const { current } = progressRef;

    current.addEventListener('transitionend', removeNode, true);

    return () => {
      current.removeEventListener('transitionend', removeNode);
    };
  });

  return (
    <Wrapper
      ref={progressRef}
      className={`no-print ${className}${props.now >= 1 ? ' finished' : ''}`}
      scaleFactor={scaleFactor}
      as="div"
      data-testid="progress-wrapper"
      {...props}
    >
      <Pie key={Math.random()} scaleFactor={scaleFactor} {...props} />
      {showLabel && (
        <Label data-testid="progress-label" vPos={labelPosition}>
          {label !== undefined ? label : `${Math.round(props.now * 100)} %`}
        </Label>
      )}
    </Wrapper>
  );
};

Progress.defaultProps = {
  className: '',
  hasPrimaryColor: true,
  inline: false,
  label: undefined,
  labelPosition: 'middle',
  now: 0,
  showLabel: true,
  type: 'determined',
  variant: 'big',
};

Progress.propTypes = {
  /** @ignore */
  className: PropTypes.string,
  /** When false, the loader bar will inherit the color (through `currentColor`) from the parent (styled) component. */
  hasPrimaryColor: PropTypes.bool,
  /** When set to true, the Progress component won't be rendered as fixed positioned */
  inline: PropTypes.bool,
  /** Text label. When left empty, the relative progress (x %) is shown. */
  label: PropTypes.string,
  /** Vertical position of the text label */
  labelPosition: PropTypes.oneOf(['top', 'middle', 'bottom']),
  /** Relative progress. Should be a number between 0 and 1 */
  now: (props, propName) => {
    const value = props[propName];

    if (value < 0 || value > 1) {
      return new Error(`The value of 'now' should be between 0 and 1. Got ${value}.`);
    }

    return null;
  },
  /** Whether or not to show the (default) label */
  showLabel: PropTypes.bool,
  /** When type is set to 'undetermined', the component shows an infinite spinner. 'determined' Should be used in conjunction with `now`. */
  type: PropTypes.oneOf(['determined', 'undetermined']),
  /** Size indicator */
  variant: PropTypes.oneOf(['small', 'big']),
};

export default Progress;
