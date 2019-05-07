import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { OBJECTS } from 'containers/App/constants';
import { makeSelectKadastraalObjectData } from 'containers/withSelector/selectors';

import Section from '../Section';

class KadastraalObject extends Component {
  render() {
    const { data, onSuccess } = this.props;
    return (
      <Fragment>
        {data && <span ref={onSuccess} />}
        <Section cfg={OBJECTS.KADASTRAAL_OBJECT} data={data} />
      </Fragment>
    );
  }
}

KadastraalObject.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  ]),
  onSuccess: PropTypes.func.isRequired,
};

KadastraalObject.defaultProps = {
  data: null,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectKadastraalObjectData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(KadastraalObject);
