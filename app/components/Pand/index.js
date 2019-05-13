import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { OBJECTS } from 'containers/App/constants';
import { makeSelectPandData } from 'containers/withSelector/selectors';

import Section from '../Section';

class Pand extends Component {
  render() {
    const { data, onSuccess } = this.props;
    return (
      <Fragment>
        {data && <span ref={onSuccess} />}
        <Section cfg={OBJECTS.PAND} data={data} />
      </Fragment>
    );
  }
}

Pand.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  onSuccess: PropTypes.func.isRequired,
};

Pand.defaultProps = {
  data: null,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectPandData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Pand);
