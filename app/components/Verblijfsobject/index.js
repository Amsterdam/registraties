import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { OBJECTS } from 'containers/App/constants';
import { makeSelectVerblijfsobjectData } from 'containers/withSelector/selectors';

import Section from '../Section';

class Verblijfsobject extends Component {
  render() {
    const { data, onSuccess } = this.props;
    return (
      <Fragment>
        {data && <span ref={onSuccess} />}
        <Section cfg={OBJECTS.VERBLIJFSOBJECT} data={data} />
      </Fragment>
    );
  }
}

Verblijfsobject.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  onSuccess: PropTypes.func.isRequired,
};

Verblijfsobject.defaultProps = {
  data: null,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectVerblijfsobjectData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Verblijfsobject);
