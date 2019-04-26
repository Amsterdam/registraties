import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  kadasterObjectReducer,
  ligplaatsReducer,
  nummeraanduidingReducer,
  pandReducer,
  verblijfsobjectReducer,
  bagReducer,
  kadasterSubjectReducer,
  handelsregisterReducer,
} from './reducer';
import {
  selectAdres,
  selectAllData,
  selectHandelsregisterData,
  selectKadasterObjectData,
  selectKadasterSubjectData,
  selectLigplaatsData,
  selectNummeraanduidingData,
  selectPandData,
  selectVerblijfsobjectData,
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
    adres: selectAdres(),
    all: selectAllData,
    handelsregister: selectHandelsregisterData(),
    kadasterObject: selectKadasterObjectData(),
    kadasterSubject: selectKadasterSubjectData(),
    ligplaats: selectLigplaatsData(),
    nummeraanduiding: selectNummeraanduidingData(),
    pand: selectPandData(),
    verblijfsobject: selectVerblijfsobjectData(),
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
