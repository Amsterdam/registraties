import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectAdres } from 'containers/withSelector/selectors';

import printValue from 'containers/AccommodationObjectPage/printValue';

class Adres extends Component {
  render() {
    const { data } = this.props;

    return data && data.map(item => <p key={item.key}>{printValue(item)}</p>);
  }
}

Adres.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  ]),
};

Adres.defaultProps = {
  data: null,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectAdres(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Adres);
