import { css } from 'styled-components';

/* eslint-disable prettier/prettier */

const progressWidth = 60;
const progressBorderWidth = 6;
const wrapperPadding = 20;

const wrapper = css`
  ${({ inline }) =>
    inline
      ? css`
          display: inline-block;
          position: relative;
        `
      : css`
          background-color: #fff;
          border: 1px solid #000;
          border-top: 0;
          position: fixed;
          left: ${({ scaleFactor }) => `calc(50% - ${((progressWidth * scaleFactor) / 2) + (wrapperPadding * scaleFactor)}px)`};
          z-index: 500;
          box-sizing: content-box;
          transition: transform 0.35s ease-out;
          transform: translate3D(0, ${({ now }) => (now >= 1 ? -120 : 0)}px, 0);
          top: 0;

          &.finished {
            transition-delay: 0.7s;
          }
        `}

  &.hidden {
    display: none;
  }
`;

export const determined = {
  Wrapper: css`
    ${wrapper};

    align-items: center;
    display: flex;
    height: ${({ scaleFactor }) => (progressWidth * scaleFactor) + (2 * wrapperPadding * scaleFactor)}px;
    justify-content: center;
    width: ${({ scaleFactor }) => (progressWidth * scaleFactor) + (2 * wrapperPadding * scaleFactor)}px;
    will-change: transform;
  `,

  Pie: css`
    height: ${({ scaleFactor }) => (progressWidth * scaleFactor)}px;
    width: ${({ scaleFactor }) => (progressWidth * scaleFactor)}px;
    position: absolute;
    ${({ now, scaleFactor }) => (now > 0.5 ? css`clip: rect(auto, auto, auto, auto)` : css`clip: rect(0, ${progressWidth * scaleFactor}px, ${progressWidth * scaleFactor}px, ${(progressWidth / 2) * scaleFactor}px)`)};
    will-change: clip;

    &::before,
    &::after {
      border-radius: 50%;
      border: ${({ scaleFactor }) => (progressBorderWidth * scaleFactor)}px solid;
      border-color: ${({ hasPrimaryColor }) => (hasPrimaryColor ? '#ec0000' : 'currentColor')};
      clip: ${({ scaleFactor }) => `rect(0, ${(progressWidth / 2) * scaleFactor}px, ${progressWidth * scaleFactor}px, 0)`};
      content: '';
      position: absolute;
      transform: translate3D(0,0,0);
      transition: transform 0.1s ease-in;
      height: ${({ scaleFactor }) => (progressWidth * scaleFactor) - (2 * progressBorderWidth * scaleFactor)}px;
      width: ${({ scaleFactor }) => (progressWidth * scaleFactor) - (2 * progressBorderWidth * scaleFactor)}px;
      will-change: transform;
    }

    &::before {
      transform: rotate(${({ now }) => Math.ceil(360 * now)}deg);
    }

    &::after {
      ${({ now }) => (now >= 0.5 ? css`transform: rotate(180deg)` : css`display: none`)};
    }
  `,
};

export const undetermined = {
  Wrapper: css`
    ${wrapper};
  `,

  Pie: css`
    height: ${({ scaleFactor }) => (progressWidth * scaleFactor)}px;
    width: ${({ scaleFactor }) => (progressWidth * scaleFactor)}px;
    border-radius: 50%;
    box-shadow: inset 0 0 0 ${({ scaleFactor }) => (progressBorderWidth * scaleFactor)}px;
    color: ${({ hasPrimaryColor }) => (hasPrimaryColor ? '#ec0000' : 'currentColor')};
    display: inline-block;
    font-size: ${({ scaleFactor }) => (progressBorderWidth * scaleFactor)}px;
    position: relative;
    text-indent: -99999em;
    transform: translate3D(0, 0, 0);
    vertical-align: middle;
    margin: ${({ inline, scaleFactor }) => (inline ? 0 : `${wrapperPadding * scaleFactor}px ${wrapperPadding * scaleFactor}px ${(wrapperPadding * scaleFactor) / 4}px`)};

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    &::before,
    &::after {
      background-color: #fff;
      content: '';
      height: ${({ scaleFactor }) => (progressBorderWidth + progressWidth) * scaleFactor}px;
      position: absolute;
    }

    &::before {
      animation: rotate 1.5s infinite ease 1.2s;
      border-radius: ${({ scaleFactor }) => `${(progressBorderWidth + progressWidth) * scaleFactor}px 0 0 ${(progressBorderWidth + progressWidth) * scaleFactor}px`};
      left: ${({ scaleFactor }) => ((progressBorderWidth * scaleFactor) / 2) * -1}px;
      top: ${({ scaleFactor }) => ((progressBorderWidth * scaleFactor) / 2) * -1}px;
      transform-origin: ${({ scaleFactor }) => `${(31.8 * scaleFactor)}px ${(33 * scaleFactor)}px`};
      width: ${({ scaleFactor }) => 31.1875 * scaleFactor}px;
    }

    &::after {
      animation: rotate 1.5s infinite ease;
      border-radius: ${({ scaleFactor }) => `0 ${(progressBorderWidth + progressWidth) * scaleFactor}px ${(progressBorderWidth + progressWidth) * scaleFactor}px 0`};
      left: ${({ scaleFactor }) => 31.1875 * scaleFactor}px;
      top: ${({ scaleFactor }) => -1.8 * scaleFactor}px;
      transform-origin: ${({ scaleFactor }) => `${-0.6 * scaleFactor}px ${33 * scaleFactor}px`};
      width: ${({ scaleFactor }) => 33.5938 * scaleFactor}px;
    }
  `,
};

export const label = css`
  text-align: center;
  font-size: 14px;
  height: 18px;
  line-height: 18px;
  color: initial;
  align-self: ${({ vPos }) => {
    if (vPos === 'top') return 'flex-start';
    if (vPos === 'bottom') return 'flex-end';
    return 'center';
  }};
`;
