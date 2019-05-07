import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import amaps from 'amsterdam-amaps/dist/amaps';
import 'amsterdam-amaps/dist/nlmaps/dist/assets/css/nlmaps.css';
import 'leaflet/dist/leaflet.css';

import CSVDownloadContainer from 'containers/CSVDownload';
import withSelector from 'containers/withSelector';
import { loadBAGData } from 'containers/withSelector/actions';
import { OBJECTS, LOAD_DATA_SUCCESS } from 'containers/App/constants';
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
import OpenbareRuimte from './components/OpenbareRuimte';
import Gebied from './components/Gebied';
import Summary from './components/Summary';

import printValue from './printValue';

export class AccommodationObjectPageComponent extends Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.toc = [];

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

  renderTOC() {
    return (
      <ul className="tabs">
        {this.toc.filter(Boolean).map(section => (
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
              <Heading>{intl.formatMessage(messages.bag_objects)}</Heading>
            </header>

            <OpenbareRuimte
              onSuccess={() => {
                this.toc[0] = intl.formatMessage(OBJECTS.OPENBARE_RUIMTE.NAME);
              }}
            />

            <Nummeraanduiding
              onSuccess={() => {
                this.toc[1] = intl.formatMessage(OBJECTS.NUMMERAANDUIDING.NAME);
              }}
            />

            <Verblijfsobject
              onSuccess={() => {
                this.toc[2] = intl.formatMessage(OBJECTS.VERBLIJFSOBJECT.NAME);
              }}
            />

            <Pand
              onSuccess={() => {
                this.toc[3] = intl.formatMessage(OBJECTS.PAND.NAME);
              }}
            />
          </section>
          <section>
            <header>
              <Heading>{intl.formatMessage(messages.brk_objects)}</Heading>
            </header>

            <KadastraalObject
              onSuccess={() => {
                this.toc[4] = intl.formatMessage(OBJECTS.KADASTRAAL_OBJECT.NAME);
              }}
            />

            <KadastraalSubjectNP
              onSuccess={() => {
                this.toc[5] = intl.formatMessage(OBJECTS.KADASTRAAL_SUBJECT_NP.NAME);
              }}
            />

            <KadastraalSubjectNNP
              onSuccess={() => {
                this.toc[6] = intl.formatMessage(OBJECTS.KADASTRAAL_SUBJECT_NNP.NAME);
              }}
            />

            <Vestiging
              onSuccess={() => {
                this.toc[7] = intl.formatMessage(OBJECTS.VESTIGING.NAME);
              }}
            />

            <Gebied
              onSuccess={() => {
                this.toc[8] = intl.formatMessage(OBJECTS.GEBIED.NAME);
              }}
            />
          </section>
        </article>

        <aside className="col-4">
          <section>
            <header>
              <Heading>{intl.formatMessage(messages.overview)}</Heading>
              {adres && adres.map(item => <p key={item.key}>{printValue(item)}</p>)}
            </header>

            <Summary />

            <MapWrapper>
              <MapContainer className="cf" id="mapdiv" />
            </MapWrapper>
          </section>

          {status === LOAD_DATA_SUCCESS && (
            <Fragment>
              <section className="invoer">
                <header>
                  <h3>{intl.formatMessage(messages.note)}</h3>
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
                  <h3>{intl.formatMessage(messages.export_cta)}</h3>
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
  status: undefined,
};

AccommodationObjectPageComponent.propTypes = {
  adres: PropTypes.arrayOf(PropTypes.shape({})),
  status: PropTypes.string,
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
