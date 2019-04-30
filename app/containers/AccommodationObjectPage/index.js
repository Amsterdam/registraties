import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedDate, FormattedMessage, FormattedNumber, injectIntl, intlShape } from 'react-intl';
import amaps from 'amsterdam-amaps/dist/amaps';
import 'amsterdam-amaps/dist/nlmaps/dist/assets/css/nlmaps.css';
import 'leaflet/dist/leaflet.css';

import CSVDownloadContainer from 'containers/CSVDownload';
import withSelector from 'containers/withSelector';
import { loadBAGData } from 'containers/withSelector/actions';

import './style.scss';
import { MapWrapper, MapContainer, Heading, Key } from './styled';

export class AccommodationObjectPageComponent extends Component {
  constructor(props) {
    super(props);

    this.sections = new Set();
  }

  componentDidMount() {
    const {
      adresseerbaarObjectId,
      nummeraanduidingId,
      openbareRuimteId,
      latitude,
      longitude,
    } = this.props.match.params;

    this.map = amaps.createMap({
      center: {
        latitude,
        longitude,
      },
      target: 'mapdiv',
      search: false,
      zoom: 15,
      marker: true,
    });

    this.props.loadBAGData({ adresseerbaarObjectId, nummeraanduidingId, openbareRuimteId });
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
    const sections = Array.from(this.sections);

    return (
      <ul className="tabs">
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

    if (title) {
      this.sections.add(title);
    }

    return (
      <Fragment key={title || Math.random()}>
        {title && <h3 id={title}>{title}</h3>}

        {data ? (
          <ul>
            {data.map(item => (
              <li key={item.key}>
                <Key lang={intl.locale}>{item.formattedKey}</Key>: {this.printValue(item)}
              </li>
            ))}
          </ul>
        ) : (
          <span>geen data</span>
        )}
      </Fragment>
    );
  }

  render() {
    const {
      adres,
      kadasterObject,
      kadasterSubject,
      nummeraanduiding,
      pand,
      summary,
      verblijfsobject,
      intl,
    } = this.props;

    return (
      <div className="row">
        <article className="col-9">
          <section>
            <header>
              <nav className="cf">{this.renderTOC()}</nav>
              <h2>BAG Objecten</h2>
            </header>

            {nummeraanduiding && this.renderSection('Nummeraanduiding', nummeraanduiding)}
            {verblijfsobject && this.renderSection('Verblijfsobjecten', verblijfsobject)}
            {pand && this.renderSection('Pand', pand)}
          </section>

          {(kadasterObject || kadasterSubject) && (
            <section>
              <header>
                <h2>BRK Objecten</h2>
              </header>

              {kadasterObject && this.renderSection('Kadastraal object', kadasterObject)}
              {kadasterSubject &&
                kadasterSubject.map((subject, index) =>
                  this.renderSection(index <= 0 && 'Kadastraal subject', subject),
                )}
            </section>
          )}
        </article>

        <aside className="col-3">
          <section>
            <header>
              <Heading>Overzicht</Heading>
              {adres &&
                adres.map(item => (
                  <p>
                    <div key={item.key}>{this.printValue(item)}</div>
                  </p>
                ))}
            </header>

            {Object.keys(summary).length && (
              <ul>
                {Object.keys(summary).map(key => (
                  <li key={key}>
                    <Key lang={intl.locale}>{key}</Key>: <small>{summary[key]}</small>
                  </li>
                ))}
              </ul>
            )}

            <MapWrapper>
              <MapContainer className="cf" id="mapdiv" />
            </MapWrapper>
          </section>

          <section>
            <header>
              <h3>Exporteren</h3>
            </header>

            <CSVDownloadContainer />
          </section>
        </aside>
      </div>
    );
  }
}

AccommodationObjectPageComponent.propTypes = {
  adres: PropTypes.string,
  handelsregister: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  kadasterObject: PropTypes.arrayOf(PropTypes.shape({})),
  kadasterSubject: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  nummeraanduiding: PropTypes.arrayOf(PropTypes.shape({})),
  pand: PropTypes.arrayOf(PropTypes.shape({})),
  summary: PropTypes.arrayOf(PropTypes.shape({})),
  verblijfsobject: PropTypes.arrayOf(PropTypes.shape({})),
  intl: intlShape.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      adresseerbaarObjectId: PropTypes.string.isRequired,
      nummeraanduidingId: PropTypes.string.isRequired,
      openbareRuimteId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadBAGData,
    },
    dispatch,
  );

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
  withSelector,
)(AccommodationObjectPageComponent);
