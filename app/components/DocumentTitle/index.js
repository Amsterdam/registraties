import { useEffect } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import messages from './messages';

const DocumentTitle = ({ intl, title }) => {
  const setDocumentTitle = newTitle => {
    document.title = newTitle;
  };

  useEffect(() => {
    setDocumentTitle(title);
    return () => {
      const defaultTitle = intl.formatMessage(messages.default_title);
      setDocumentTitle(defaultTitle);
    };
  }, [intl.locale, title]);

  return null;
};

DocumentTitle.propTypes = {
  intl: intlShape.isRequired,
  title: PropTypes.string.isRequired,
};

export default injectIntl(DocumentTitle);
