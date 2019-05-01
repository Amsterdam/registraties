import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedDate, FormattedMessage, FormattedNumber, injectIntl, intlShape } from 'react-intl';
import amaps from 'amsterdam-amaps/dist/amaps';
import 'amsterdam-amaps/dist/nlmaps/dist/assets/css/nlmaps.css';
import 'leaflet/dist/leaflet.css';

import LoadingIndicator from 'components/LoadingIndicator';
import CSVDownloadContainer from 'containers/CSVDownload';
import withSelector from 'containers/withSelector';
import { loadBAGData } from 'containers/withSelector/actions';
import { OBJECTS } from 'containers/withSelector/constants';

import { isArray } from 'utils';

import './style.scss';
import { MapWrapper, MapContainer, Heading, Key, Textarea, Ul } from './styled';

export class AccommodationObjectPageComponent extends Component {
  constructor(props) {
    super(props);

    this.sections = new Set();

    this.state = {
      notitie: '',
    };

    this.onInput = this.onInput.bind(this);
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

  renderSummary(summary) {
    const { intl } = this.props;

    return (
      Object.keys(summary).length && (
        <ul className="list-unstyled">
          {Object.keys(summary).map(key => (
            <li key={key}>
              <Key lang={intl.locale}>{key}</Key>: <small>{summary[key]}</small>
            </li>
          ))}
        </ul>
      )
    );
  }

  renderSection(cfg, data) {
    const { intl } = this.props;
    const { NAME, STELSELPEDIA_LINK } = cfg;
    const sectionData = data.length === 1 && isArray(data[0]) ? data[0] : data;

    this.sections.add(NAME);

    const renderList = listData => (
      <Ul>
        {listData.map(listItem => (
          <li key={listItem.key || Math.random()}>
            {isArray(listItem) ? (
              renderList(listItem)
            ) : (
              <Fragment>
                <Key lang={intl.locale}>{listItem.formattedKey}</Key>: {this.printValue(listItem)}
              </Fragment>
            )}
          </li>
        ))}
      </Ul>
    );

    return (
      <Fragment key={NAME}>
        {NAME && (
          <Fragment>
            <h3 id={NAME}>
              {NAME}
              <a className="stelselpediaLink" href={STELSELPEDIA_LINK} target="_blank" rel="noopener noreferrer">
                <span>i</span>
              </a>
            </h3>
          </Fragment>
        )}

        {renderList(sectionData)}
      </Fragment>
    );
  }

  onInput(event) {
    event.persist();
    const {
      currentTarget: { value },
    } = event;

    this.setState({ notitie: value });
  }

  render() {
    const {
      adres,
      kadastraalObject,
      kadastraalSubjectNNP,
      kadastraalSubjectNP,
      nummeraanduiding,
      pand,
      summary,
      status,
      verblijfsobject,
      vestiging,
    } = this.props;

    const { notitie } = this.state;

    return (
      <div className="row">
        <nav className="cf">{this.renderTOC()}</nav>
        <article className="col-8">
          <section>
            <header>
              <Heading>BAG Objecten</Heading>
            </header>

            {nummeraanduiding && this.renderSection(OBJECTS.NUMMERAANDUIDING, nummeraanduiding)}

            {verblijfsobject && this.renderSection(OBJECTS.VERBLIJFSOBJECT, verblijfsobject)}

            {pand && this.renderSection(OBJECTS.PAND, pand)}
          </section>

          {(kadastraalObject || kadastraalSubjectNP || kadastraalSubjectNNP) && (
            <section>
              <header>
                <Heading>BRK Objecten</Heading>
              </header>

              {kadastraalObject && this.renderSection(OBJECTS.KADASTRAAL_OBJECT, kadastraalObject)}

              {kadastraalSubjectNP && this.renderSection(OBJECTS.KADASTRAAL_SUBJECT_NP, kadastraalSubjectNP)}

              {kadastraalSubjectNNP && this.renderSection(OBJECTS.KADASTRAAL_SUBJECT_NNP, kadastraalSubjectNNP)}

              {vestiging && this.renderSection(OBJECTS.VESTIGING, vestiging)}
            </section>
          )}
        </article>

        <aside className="col-4">
          <section>
            <header>
              <Heading>Overzicht</Heading>
              {adres && adres.map(item => <p key={item.key}>{this.printValue(item)}</p>)}
            </header>

            {summary && this.renderSummary(summary)}

            <MapWrapper>
              <MapContainer className="cf" id="mapdiv" />
            </MapWrapper>
          </section>

          <section className="invoer">
            <header>
              <h3>Notitie</h3>
            </header>

            <Textarea
              className="input"
              name="notitie"
              id="areaNotitie"
              row="5"
              placeholder="Je notitie wordt niet bewaard, maar is wel te zien in de export."
              onChange={this.onInput}
            />
          </section>

          <section>
            <header>
              <h3>Exporteren</h3>
            </header>

            {status === 'success' ? <CSVDownloadContainer data={{ notitie }} /> : <LoadingIndicator />}
          </section>
        </aside>
      </div>
    );
  }
}

AccommodationObjectPageComponent.defaultProps = {
  adres: undefined,
  kadastraalObject: undefined,
  kadastraalSubjectNNP: undefined,
  kadastraalSubjectNP: undefined,
  nummeraanduiding: undefined,
  pand: undefined,
  summary: undefined,
  status: undefined,
  verblijfsobject: undefined,
  vestiging: undefined,
};

AccommodationObjectPageComponent.propTypes = {
  adres: PropTypes.arrayOf(PropTypes.shape({})),
  kadastraalObject: PropTypes.arrayOf(PropTypes.shape({})),
  kadastraalSubjectNNP: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  kadastraalSubjectNP: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  nummeraanduiding: PropTypes.arrayOf(PropTypes.shape({})),
  pand: PropTypes.arrayOf(PropTypes.shape({})),
  summary: PropTypes.shape({}),
  status: PropTypes.string,
  verblijfsobject: PropTypes.arrayOf(PropTypes.shape({})),
  vestiging: PropTypes.arrayOf(PropTypes.shape({})),
  intl: intlShape.isRequired,
  loadBAGData: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      adresseerbaarObjectId: PropTypes.string.isRequired,
      nummeraanduidingId: PropTypes.string.isRequired,
      openbareRuimteId: PropTypes.string.isRequired,
      latitude: PropTypes.string.isRequired,
      longitude: PropTypes.string.isRequired,
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
  withSelector,
  injectIntl,
)(AccommodationObjectPageComponent);
