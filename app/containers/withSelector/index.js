import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  bagReducer,
  handelsregisterReducer,
  kadasterObjectReducer,
  kadasterSubjectReducer,
  ligplaatsReducer,
  nummeraanduidingReducer,
  pandReducer,
  verblijfsobjectReducer,
} from './reducer';
import {
  makeSelectAdres,
  // makeSelectAllData,
  makeSelectHandelsregisterData,
  makeSelectKadasterObjectData,
  makeSelectKadasterSubjectData,
  makeSelectLigplaatsData,
  makeSelectNummeraanduidingData,
  makeSelectPandData,
  makeSelectVerblijfsobjectData,
} from './selectors';
import saga from './saga';

const withSelectors = WrappedComponent => {
  // eslint-disable-next-line
  class SelectorContainer extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = createStructuredSelector({
    adres: makeSelectAdres(),
    handelsregister: makeSelectHandelsregisterData(),
    kadasterObject: makeSelectKadasterObjectData(),
    kadasterSubject: makeSelectKadasterSubjectData(),
    ligplaats: makeSelectLigplaatsData(),
    nummeraanduiding: makeSelectNummeraanduidingData(),
    pand: makeSelectPandData(),
    verblijfsobject: makeSelectVerblijfsobjectData(),
  });

  const withConnect = connect(mapStateToProps);
  const withSaga = injectSaga({ key: 'global', saga });

  const ComposedSelectorContainer = compose(
    injectReducer({ key: 'bag', reducer: bagReducer }),
    injectReducer({ key: 'handelsregister', reducer: handelsregisterReducer }),
    injectReducer({ key: 'kadasterObject', reducer: kadasterObjectReducer }),
    injectReducer({ key: 'kadasterSubject', reducer: kadasterSubjectReducer }),
    injectReducer({ key: 'ligplaats', reducer: ligplaatsReducer }),
    injectReducer({ key: 'nummeraanduiding', reducer: nummeraanduidingReducer }),
    injectReducer({ key: 'pand', reducer: pandReducer }),
    injectReducer({ key: 'verblijfsobject', reducer: verblijfsobjectReducer }),
    withSaga,
    withConnect,
  )(SelectorContainer);

  return ComposedSelectorContainer;
};

export default withSelectors;
