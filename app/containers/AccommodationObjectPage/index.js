import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedDate, FormattedMessage, FormattedNumber, injectIntl, intlShape } from 'react-intl';
import amaps from 'amsterdam-amaps/dist/amaps';
import 'amsterdam-amaps/dist/nlmaps/dist/assets/css/nlmaps.css';
import 'leaflet/dist/leaflet.css';

import { isArray, isObject } from 'utils';

import LoadingIndicator from 'components/LoadingIndicator';
import CSVDownloadContainer from 'containers/CSVDownload';
import withSelector from 'containers/withSelector';
import { loadBAGData } from 'containers/withSelector/actions';
import { OBJECTS } from 'containers/App/constants';
import messages from 'containers/App/messages';

import './style.scss';
import { MapWrapper, MapContainer, Heading, Key, Textarea, Ul, Tabs } from './styled';

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
    const {
      intl: { locale, formatMessage },
    } = this.props;

    return (
      Object.keys(summary).length && (
        <ul className="list-unstyled">
          {Object.keys(summary).map(key => (
            <li key={key}>
              <Key lang={locale}>{formatMessage(summary[key].label)}</Key>: <small>{summary[key].value}</small>
            </li>
          ))}
        </ul>
      )
    );
  }

  renderSection(cfg, data) {
    const {
      intl: { formatMessage, locale },
    } = this.props;
    const { NAME, STELSELPEDIA_LINK } = cfg;
    const sectionData = data.length === 1 && isArray(data[0]) ? data[0] : data;
    const name = formatMessage(NAME);
    this.sections.add(name);

    const renderList = listData => (
      <Ul>
        {listData.map(listItem => {
          let readableKey = listItem.formattedKey;

          if (isObject(readableKey) && readableKey.id) {
            readableKey = formatMessage(readableKey, { entity: listItem.key });
          }

          return (
            <li key={listItem.key || Math.random()}>
              {isArray(listItem) ? (
                renderList(listItem)
              ) : (
                <Fragment>
                  <Key lang={locale}>{readableKey}</Key>: {this.printValue(listItem)}
                </Fragment>
              )}
            </li>
          );
        })}
      </Ul>
    );

    return (
      <Fragment key={name}>
        {name && (
          <Fragment>
            <h3 id={name}>
              {name}
              <a
                className="stelselpediaLink"
                href={STELSELPEDIA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                title={formatMessage(messages.to_stelselpedia, { name })}
              >
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
      intl,
      kadastraalObject,
      kadastraalSubjectNNP,
      kadastraalSubjectNP,
      nummeraanduiding,
      pand,
      status,
      summary,
      verblijfsobject,
      vestiging,
    } = this.props;

    const { notitie } = this.state;
    const { formatMessage } = intl;

    return (
      <div className="row">
        <Tabs className="cf">{this.renderTOC()}</Tabs>

        <article className="col-8">
          <section>
            <header>
              <Heading>
                <FormattedMessage {...messages.bag_objects} />
              </Heading>
            </header>

            {nummeraanduiding && this.renderSection(OBJECTS.NUMMERAANDUIDING, nummeraanduiding)}

            {verblijfsobject && this.renderSection(OBJECTS.VERBLIJFSOBJECT, verblijfsobject)}

            {pand && this.renderSection(OBJECTS.PAND, pand)}
          </section>

          {(kadastraalObject || kadastraalSubjectNP || kadastraalSubjectNNP) && (
            <section>
              <header>
                <Heading>
                  <FormattedMessage {...messages.brk_objects} />
                </Heading>
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
              <Heading>
                <FormattedMessage {...messages.overview} />
              </Heading>
              {adres && adres.map(item => <p key={item.key}>{this.printValue(item)}</p>)}
            </header>

            {summary && this.renderSummary(summary)}

            <MapWrapper>
              <MapContainer className="cf" id="mapdiv" />
            </MapWrapper>
          </section>

          {status === 'pending' && <LoadingIndicator />}
          {status === 'success' && (
            <Fragment>
              <section className="invoer">
                <header>
                  <h3>
                    <FormattedMessage {...messages.note} />
                  </h3>
                </header>

                <Textarea
                  className="input"
                  name="notitie"
                  id="areaNotitie"
                  row="5"
                  placeholder={formatMessage(messages.note_remark)}
                  onChange={this.onInput}
                />
              </section>

              <section>
                <header>
                  <h3>
                    <FormattedMessage {...messages.export_cta} />
                  </h3>
                </header>

                <CSVDownloadContainer data={{ notitie }} />
              </section>
            </Fragment>
          )}
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
  vestiging: PropTypes.array,
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
