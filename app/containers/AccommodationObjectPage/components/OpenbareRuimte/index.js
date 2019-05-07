import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { OBJECTS } from 'containers/App/constants';
import { makeSelectOpenbareRuimteData } from 'containers/withSelector/selectors';

import Section from '../Section';

class OpenbareRuimte extends Component {
  render() {
    const { data, onSuccess } = this.props;
    return (
      <Fragment>
        {data && <span ref={onSuccess} />}
        <Section cfg={OBJECTS.OPENBARE_RUIMTE} data={data} />
      </Fragment>
    );
  }
}

OpenbareRuimte.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  onSuccess: PropTypes.func.isRequired,
};

OpenbareRuimte.defaultProps = {
  data: null,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectOpenbareRuimteData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(OpenbareRuimte);
