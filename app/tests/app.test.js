/* eslint-disable no-underscore-dangle */
const html = require('../index.html');

describe('app.js', () => {
  it('should have correct Piwik site id', () => {
    document.body.innerHTML = html;
    const script = document.getElementsByTagName('script')[0].innerHTML;
    const match = script.match(/_paq\.push\(\['setSiteId', '([^']+)'\]\)/);

    expect(Number.parseInt(match[1], 10)).toEqual(24);
  });
});
