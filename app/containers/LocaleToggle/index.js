/**
 * LanguageToggle
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { changeLocale } from '../LanguageProvider/actions';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import { DEFAULT_LOCALE } from '../../i18n';

export class LocaleToggle extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  // TODO: the switching between locale and the displaylocalename can be prettier
  onToggle(locale) {
    let switchTo;
    switch (locale) {
      case 'en':
        switchTo = 'nl';
        break;
      case 'nl':
        switchTo = 'en';
        break;
      default:
        switchTo = DEFAULT_LOCALE;
    }
    this.props.onLocaleToggle(switchTo);
  }

  getSwitchToLocaleName(locale) {
    switch (locale) {
      case 'en':
        return 'Nederlands';
      case 'nl':
        return 'English';
      default:
        return '';
    }
  }

  render() {
    return (
      <button onClick={() => this.onToggle(this.props.locale)} type="button">
        <span className="linklabel">{this.getSwitchToLocaleName(this.props.locale)}</span>
      </button>
    );
  }
}

LocaleToggle.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(
  makeSelectLocale(),
  locale => ({ locale }),
);

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: locale => dispatch(changeLocale(locale)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaleToggle);
