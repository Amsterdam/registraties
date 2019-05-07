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
import { LOAD_DATA_PENDING, LOAD_DATA_SUCCESS } from 'containers/App/constants';
import messages from 'containers/App/messages';

import './style.scss';
import { MapWrapper, MapContainer, Heading, Textarea, Tabs } from './styled';

import Verblijfsobject from './components/Verblijfsobject';
import KadastraalObject from './components/KadastraalObject';
import KadastraalSubjectNP from './components/KadastraalSubjectNP';
import KadastraalSubjectNNP from './components/KadastraalSubjectNNP';
import Nummeraanduiding from './components/Nummeraanduiding';
import Pand from './components/Pand';
import Vestiging from './components/Vestiging';
import Summary from './components/Summary';

export class AccommodationObjectPageComponent extends Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.sections = new Set();

    this.state = {
      notitie: '',
    };

    this.onInput = this.onInput.bind(this);
  }

  componentDidMount() {
    const { adresseerbaarObjectId, nummeraanduidingId, openbareRuimteId } = this.props.match.params;

    this.props.loadBAGData({ adresseerbaarObjectId, nummeraanduidingId, openbareRuimteId });
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props;
    const { latitude, longitude } = this.props.match.params;

    if (status !== prevProps.status && status === LOAD_DATA_SUCCESS) {
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
    }
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
      case 'currency':
        return (
          <FormattedNumber
            value={formattedValue}
            style="currency" // eslint-disable-line
            currency="EUR"
            currencyDisplay="symbol"
            minimumFractionDigits={0}
            maximumFractionDigits={0}
          />
        );
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

  onInput(event) {
    event.persist();
    const {
      currentTarget: { value },
    } = event;

    this.setState({ notitie: value });
  }

  render() {
    const { adres, intl, status } = this.props;
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

            <Nummeraanduiding />

            <Verblijfsobject />

            <Pand />
          </section>
          <section>
            <header>
              <Heading>
                <FormattedMessage {...messages.brk_objects} />
              </Heading>
            </header>

            <KadastraalObject
              onLoad={() => {
                this.sections.add('Kadastraal Object');
              }}
            />

            <KadastraalSubjectNP />

            <KadastraalSubjectNNP />

            <Vestiging />
          </section>
        </article>

        <aside className="col-4">
          {status === LOAD_DATA_PENDING && <LoadingIndicator />}
          {status === LOAD_DATA_SUCCESS && (
            <Fragment>
              <section>
                <header>
                  <Heading>
                    <FormattedMessage {...messages.overview} />
                  </Heading>
                  {adres && adres.map(item => <p key={item.key}>{this.printValue(item)}</p>)}
                </header>

                <Summary />

                <MapWrapper>
                  <MapContainer className="cf" id="mapdiv" />
                </MapWrapper>
              </section>

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
  // kadastraalObject: undefined,
  // kadastraalSubjectNNP: undefined,
  // kadastraalSubjectNP: undefined,
  // nummeraanduiding: undefined,
  // pand: undefined,
  // summary: undefined,
  status: undefined,
  // verblijfsobject: undefined,
  // vestiging: undefined,
};

AccommodationObjectPageComponent.propTypes = {
  adres: PropTypes.arrayOf(PropTypes.shape({})),
  // kadastraalObject: PropTypes.arrayOf(PropTypes.shape({})),
  // kadastraalSubjectNNP: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  // kadastraalSubjectNP: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  // nummeraanduiding: PropTypes.arrayOf(PropTypes.shape({})),
  // pand: PropTypes.arrayOf(PropTypes.shape({})),
  // summary: PropTypes.shape({}),
  status: PropTypes.string,
  // verblijfsobject: PropTypes.arrayOf(PropTypes.shape({})),
  // vestiging: PropTypes.array,
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
