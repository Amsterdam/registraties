import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import DocumentTitle from 'components/DocumentTitle';

import messages from './messages';

const NotFound = ({ intl }) => (
  <article>
    <DocumentTitle title={`${intl.formatMessage(messages.document_title)} 404`} />
    <h1>
      <FormattedMessage {...messages.header} />
    </h1>
  </article>
);

NotFound.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(NotFound);
