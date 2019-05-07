import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { makeSelectStatus } from 'containers/App/selectors';

import * as reducers from './reducer';
import * as selectors from './selectors';
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
    // summary: selectors.makeSelectSummary(),
    status: makeSelectStatus(),
    adres: selectors.makeSelectAdres(),
    // kadastraalObject: selectors.makeSelectKadastraalObjectData(),
    // kadastraalSubjectNNP: selectors.makeSelectKadastraalSubjectNNPData(),
    // kadastraalSubjectNP: selectors.makeSelectKadastraalSubjectNPData(),
    // nummeraanduiding: selectors.makeSelectNummeraanduidingData(),
    // pand: selectors.makeSelectPandData(),
    // verblijfsobject: selectors.makeSelectVerblijfsobjectData(),
    // vestiging: selectors.makeSelectVestigingData(),
  });

  const withConnect = connect(mapStateToProps);
  const withSaga = injectSaga({ key: 'global', saga });

  const ComposedSelectorContainer = compose(
    injectReducer({ key: 'bag', reducer: reducers.bagReducer }),
    injectReducer({ key: 'kadastraalObject', reducer: reducers.kadastraalObjectReducer }),
    injectReducer({ key: 'kadastraalSubject', reducer: reducers.kadastraalSubjectReducer }),
    injectReducer({ key: 'nummeraanduiding', reducer: reducers.nummeraanduidingReducer }),
    injectReducer({ key: 'pand', reducer: reducers.pandReducer }),
    injectReducer({ key: 'verblijfsobject', reducer: reducers.verblijfsobjectReducer }),
    injectReducer({ key: 'vestiging', reducer: reducers.vestigingReducer }),
    withSaga,
    withConnect,
  )(SelectorContainer);

  return ComposedSelectorContainer;
};

export default withSelectors;
