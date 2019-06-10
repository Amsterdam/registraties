import messages from '../messages';

describe('containers/App/messages', () => {
  it('should match the snapshot', () => {
    expect(messages).toMatchSnapshot();
  });
});
