import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { OBJECTS } from 'containers/App/constants';
import { makeSelectNummeraanduidingData } from 'containers/withSelector/selectors';

import Section from '../Section';

class Nummeraanduiding extends Component {
  render() {
    const { data, onSuccess } = this.props;
    return (
      <Fragment>
        {data && <span ref={onSuccess} />}
        <Section cfg={OBJECTS.NUMMERAANDUIDING} data={data} />
      </Fragment>
    );
  }
}

Nummeraanduiding.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  onSuccess: PropTypes.func.isRequired,
};

Nummeraanduiding.defaultProps = {
  data: null,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectNummeraanduidingData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Nummeraanduiding);
