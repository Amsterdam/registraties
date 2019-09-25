import React from 'react';
import { FormattedMessage } from 'react-intl';
import DocumentTitle from 'components/DocumentTitle';

import messages from './messages';

const NotFound = () => (
  <article>
    <DocumentTitle title="Registraties 404" />
    <h1>
      <FormattedMessage {...messages.header} />
    </h1>
  </article>
);

export default NotFound;
