export const testActionCreator = (action, actionType, payload) => {
  const expected = {
    type: actionType,
    payload,
  };
  expect(action(payload)).toEqual(expected);
};

export const intl = props => ({
  locale: 'nl',
  messages: [],
  formats: {},
  timeZone: null,
  textComponent: 'span',
  defaultLocale: 'en',
  defaultFormats: {},
  formatDate: jest.fn(input => input),
  formatTime: () => {},
  formatRelative: () => {},
  formatNumber: () => {},
  formatPlural: () => {},
  formatMessage: () => {},
  formatHTMLMessage: () => {},
  now: () => {},
  ...props,
});
