import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { makeSelectStatus } from 'containers/App/selectors';

import * as reducers from './reducer';
import saga from './saga';

const withSelectors = WrappedComponent => {
  // component needs to be a class, so that it can have state
  // eslint-disable-next-line
  class SelectorContainer extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = createStructuredSelector({
    status: makeSelectStatus(),
  });

  const withConnect = connect(mapStateToProps);
  const withSaga = injectSaga({ key: 'global', saga });

  const ComposedSelectorContainer = compose(
    injectReducer({ key: 'toc', reducer: reducers.tocReducer }),
    injectReducer({ key: 'bag', reducer: reducers.bagReducer }),
    injectReducer({ key: 'kadastraalObject', reducer: reducers.kadastraalObjectReducer }),
    injectReducer({ key: 'kadastraalSubjectNNP', reducer: reducers.kadastraalSubjectNNPReducer }),
    injectReducer({ key: 'kadastraalSubjectNP', reducer: reducers.kadastraalSubjectNPReducer }),
    injectReducer({ key: 'ligplaats', reducer: reducers.ligplaatsReducer }),
    injectReducer({ key: 'nummeraanduiding', reducer: reducers.nummeraanduidingReducer }),
    injectReducer({ key: 'openbareRuimte', reducer: reducers.openbareRuimteReducer }),
    injectReducer({ key: 'pand', reducer: reducers.pandReducer }),
    injectReducer({ key: 'verblijfsobject', reducer: reducers.verblijfsobjectReducer }),
    injectReducer({ key: 'vestiging', reducer: reducers.vestigingReducer }),
    injectReducer({ key: 'woonplaats', reducer: reducers.woonplaatsReducer }),
    withSaga,
    withConnect,
  )(SelectorContainer);

  return ComposedSelectorContainer;
};

export default withSelectors;
