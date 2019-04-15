/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `src/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from './selectors';
import { DEFAULT_LOCALE } from '../../i18n';

export const LanguageProvider = ({ locale, messages, children }) => (
  <IntlProvider locale={locale} key={locale} messages={messages[locale]} defaultLocale={DEFAULT_LOCALE}>
    {React.Children.only(children)}
  </IntlProvider>
);

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createSelector(
  makeSelectLocale(),
  locale => ({ locale }),
);

export default connect(mapStateToProps)(LanguageProvider);
