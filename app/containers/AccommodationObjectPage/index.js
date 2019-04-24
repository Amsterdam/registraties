import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedDate, FormattedMessage, FormattedNumber, injectIntl, intlShape } from 'react-intl';

// import amaps from 'amsterdam-amaps/dist/amaps';
import 'amsterdam-amaps/dist/nlmaps/dist/assets/css/nlmaps.css';
import 'leaflet/dist/leaflet.css';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { loadBAGData } from './actions';
import {
  bagReducer,
  kadasterReducer,
  ligplaatsReducer,
  nummeraanduidingReducer,
  openbareRuimteReducer,
  pandReducer,
  verblijfsobjectReducer,
} from './reducer';
import saga from './saga';
import {
  selectBAGData,
  selectKadasterData,
  selectLigplaatsData,
  selectNummeraanduidingData,
  selectOpenbareRuimteData,
  selectPandData,
  selectVerblijfsobjectData,
} from './selectors';

import './style.scss';
import { MapWrapper, MapContainer, Heading, Key } from './styled';

export class AccommodationObjectPageComponent extends Component {
  componentDidMount() {
    // const { latlng } = this.props.location.state;
    // const [longitude, latitude] = latlng.coordinates;
    const { adresseerbaarobjectId, nummeraanduidingId, openbareruimteId } = this.props.match.params;
    // // const map =
    // amaps.createMap({
    //   center: {
    //     latitude,
    //     longitude,
    //   },
    //   target: 'mapdiv',
    //   search: false,
    //   zoom: 15,
    //   marker: true,
    // });
    this.props.loadBAGData({ adresseerbaarobjectId, nummeraanduidingId, openbareruimteId });
  }

  printValue(meta) {
    const { type, formattedValue } = meta;

    switch (type) {
      case 'boolean':
        return <FormattedMessage {...formattedValue} />;
      case 'date':
        return <FormattedDate value={formattedValue} />;
      case 'number':
        return <FormattedNumber value={formattedValue} />;
      case 'string':
      default:
        return formattedValue;
    }
  }

  renderTOC() {
    const sections = [
      'Openbare ruimte',
      'Nummeraanduiding',
      'Ligplaats',
      'Verblijfsobjecten',
      'Pand',
      'Kadastraal object',
      'Kadastraal subject NNP',
    ];
    return (
      <ul className="links horizontal">
        {sections.map(section => (
          <li key={section}>
            <a href={`#${section}`}>
              <span className="linklabel">{section}</span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  renderSection(title, data) {
    const { intl } = this.props;

    return (
      data && (
        <Fragment>
          {title && <h3 id={title}>{title}</h3>}
          <ul>
            {data.map(item => (
              <li key={item.key}>
                <Key lang={intl.locale}>{item.formattedKey}</Key>: {this.printValue(item)}
              </li>
            ))}
          </ul>
        </Fragment>
      )
    );
  }

  render() {
    const { verblijfsobject, nummeraanduiding, pand, openbareRuimte, kadaster, ligplaats } = this.props;
    const address = undefined;

    return (
      <div className="row">
        <article className="col-9">
          <section>
            <header>
              <h2>BAG Objecten</h2>
            </header>

            {this.renderSection('Openbare ruimte', openbareRuimte)}
            {verblijfsobject && this.renderSection('Verblijfsobjecten', verblijfsobject)}
            {ligplaats && this.renderSection('Ligplaats', ligplaats)}
            {pand && this.renderSection('Pand', pand)}
            {this.renderSection('Nummeraanduiding', nummeraanduiding)}
          </section>

          <section>
            <header>
              <h2>BRK Objecten</h2>
            </header>

            {this.renderSection('Kadastraal object', kadaster)}
          </section>
        </article>

        <aside className="col-3">
          <Heading>Overzicht</Heading>
          {address &&
            address.split(',').map(part => (
              <Fragment key={part}>
                {part}
                <br />
              </Fragment>
            ))}

          <nav>{this.renderTOC()}</nav>

          <MapWrapper>
            <MapContainer id="mapdiv" />
          </MapWrapper>
        </aside>
      </div>
    );
  }
}

AccommodationObjectPageComponent.defaultProps = {
  // loadBAGData: null,
};

AccommodationObjectPageComponent.propTypes = {
  bag: PropTypes.arrayOf(PropTypes.shape({})),
  kadaster: PropTypes.arrayOf(PropTypes.shape({})),
  ligplaats: PropTypes.arrayOf(PropTypes.shape({})),
  nummeraanduiding: PropTypes.arrayOf(PropTypes.shape({})),
  openbareRuimte: PropTypes.arrayOf(PropTypes.shape({})),
  pand: PropTypes.arrayOf(PropTypes.shape({})),
  verblijfsobject: PropTypes.arrayOf(PropTypes.shape({})),
  intl: intlShape.isRequired,
  // loadBAGData: PropTypes.func.isRequired,
  // location: PropTypes.shape({
  //   state: PropTypes.shape({
  //     latlng: PropTypes.shape({
  //       coordinates: PropTypes.arrayOf(PropTypes.number),
  //     }).isRequired,
  //     location: PropTypes.string.isRequired,
  //     resultObject: PropTypes.shape({}).isRequired,
  //   }).isRequired,
  // }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      adresseerbaarobjectId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  bag: selectBAGData(),
  kadaster: selectKadasterData(),
  ligplaats: selectLigplaatsData(),
  nummeraanduiding: selectNummeraanduidingData(),
  openbareRuimte: selectOpenbareRuimteData(),
  pand: selectPandData(),
  verblijfsobject: selectVerblijfsobjectData(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadBAGData,
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'global', saga });
const withIntl = injectIntl(AccommodationObjectPageComponent);

export default compose(
  injectReducer({ key: 'bag', reducer: bagReducer }),
  injectReducer({ key: 'kadaster', reducer: kadasterReducer }),
  injectReducer({ key: 'ligplaats', reducer: ligplaatsReducer }),
  injectReducer({ key: 'nummeraanduiding', reducer: nummeraanduidingReducer }),
  injectReducer({ key: 'openbareRuimte', reducer: openbareRuimteReducer }),
  injectReducer({ key: 'pand', reducer: pandReducer }),
  injectReducer({ key: 'verblijfsobject', reducer: verblijfsobjectReducer }),
  withSaga,
  withConnect,
)(withIntl);
