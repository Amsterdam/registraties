import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import { makeSelectSummary } from 'containers/withSelector/selectors';
import { Key } from 'containers/AccommodationObjectPage/styled';

// eslint-disable-next-line
class Summary extends Component {
  render() {
    const { data, intl } = this.props;
    const { locale, formatMessage } = intl;

    return Object.keys(data).length ? (
      <ul className="list-unstyled">
        {Object.keys(data).map(key => (
          <li key={key}>
            <Key lang={locale}>{formatMessage(data[key].label)}</Key>: <small>{data[key].value}</small>
          </li>
        ))}
      </ul>
    ) : null;
  }
}

Summary.propTypes = {
  data: PropTypes.shape({
    RSIN: PropTypes.shape({}),
    accommodation_object_id: PropTypes.shape({}),
    cadastral_object_nr: PropTypes.shape({}),
    chamber_of_commerce_nr: PropTypes.shape({}),
    house_id: PropTypes.shape({}),
    number_indication_id: PropTypes.shape({}),
  }),
  intl: intlShape.isRequired,
};

Summary.defaultProps = {
  data: null,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectSummary(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  injectIntl,
  withConnect,
)(Summary);
