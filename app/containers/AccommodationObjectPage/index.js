import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import equal from 'fast-deep-equal';

import CSVDownloadContainer from 'containers/CSVDownload';
import withSelector from 'containers/withSelector';
import { loadBAGData } from 'containers/withSelector/actions';
import { OBJECTS, LOAD_DATA_SUCCESS } from 'containers/App/constants';
import messages from 'containers/App/messages';

import Verblijfsobject from 'containers/Verblijfsobject';
import KadastraalObject from 'containers/KadastraalObject';
import KadastraalSubjectNP from 'containers/KadastraalSubjectNP';
import KadastraalSubjectNNP from 'containers/KadastraalSubjectNNP';
import Nummeraanduiding from 'containers/Nummeraanduiding';
import Pand from 'containers/Pand';
import Vestiging from 'containers/Vestiging';
import OpenbareRuimte from 'containers/OpenbareRuimte';
import Gebied from 'containers/Gebied';
import Summary from 'containers/Summary';
import Woonplaats from 'containers/Woonplaats';

import TOC from 'containers/TOC';
import Map from 'components/Map';

import './style.scss';
import { MapWrapper, MapContainer, Heading, Textarea, Aside } from './styled';

export class AccommodationObjectPageComponent extends Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.toc = [];

    this.state = {
      filledInBy: '',
      notitie: '',
      toc: [],
    };

    this.onInput = this.onInput.bind(this);
  }

  initiateFetch() {
    this.setState({ toc: [] });
    const { vboId, ligId, brkId } = this.props.match.params;

    this.props.loadBAGData({ vboId, ligId, brkId });
  }

  componentDidMount() {
    this.initiateFetch();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!equal(prevProps.match.params, this.props.match.params)) {
      this.initiateFetch();
    }

    if (this.props.status === LOAD_DATA_SUCCESS && prevState.toc !== this.toc) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ toc: this.toc });
    }
  }

  onInput(event) {
    event.persist();
    const {
      currentTarget: { name, value },
    } = event;

    if (name === 'filled_in_by') {
      this.setState({ filledInBy: value });
    } else {
      this.setState({ notitie: value });
    }
  }

  render() {
    const { intl, status, coordinates } = this.props;
    const { notitie, filledInBy, toc } = this.state;
    const { formatMessage } = intl;

    return (
      <div className="row justify-content-lg-between">
        <article className="col-7">
          <section>
            <header>
              <Heading marginCollapse>{intl.formatMessage(messages.bag_objects)}</Heading>
            </header>

            <OpenbareRuimte
              onSuccess={() => {
                this.toc[0] = intl.formatMessage(OBJECTS.OPENBARE_RUIMTE.NAME);
              }}
            />

            <Woonplaats
              onSuccess={() => {
                this.toc[1] = intl.formatMessage(OBJECTS.WOONPLAATS.NAME);
              }}
            />

            <Nummeraanduiding
              onSuccess={() => {
                this.toc[2] = intl.formatMessage(OBJECTS.NUMMERAANDUIDING.NAME);
              }}
            />

            <Verblijfsobject
              onSuccess={() => {
                this.toc[3] = intl.formatMessage(OBJECTS.VERBLIJFSOBJECT.NAME);
              }}
            />

            <Pand
              onSuccess={() => {
                this.toc[4] = intl.formatMessage(OBJECTS.PAND.NAME);
              }}
            />
          </section>
          <section>
            <header>
              <Heading marginCollapse>{intl.formatMessage(messages.brk_objects)}</Heading>
            </header>

            <KadastraalObject
              onSuccess={() => {
                this.toc[5] = intl.formatMessage(OBJECTS.KADASTRAAL_OBJECT.NAME);
              }}
            />

            <KadastraalSubjectNP
              onSuccess={() => {
                this.toc[6] = intl.formatMessage(OBJECTS.KADASTRAAL_SUBJECT_NP.NAME);
              }}
            />

            <KadastraalSubjectNNP
              onSuccess={() => {
                this.toc[7] = intl.formatMessage(OBJECTS.KADASTRAAL_SUBJECT_NNP.NAME);
              }}
            />

            <Vestiging
              onSuccess={() => {
                this.toc[8] = intl.formatMessage(OBJECTS.VESTIGING.NAME);
              }}
            />

            <Gebied
              onSuccess={() => {
                this.toc[9] = intl.formatMessage(OBJECTS.GEBIED.NAME);
              }}
            />
          </section>
        </article>

        <Aside className="col-4">
          {status === LOAD_DATA_SUCCESS && (
            <>
              <TOC sections={toc} />
              <section>
                <header>
                  <Heading small>{intl.formatMessage(messages.overview)}</Heading>
                </header>

                <Summary />

                {coordinates && (
                  <MapWrapper>
                    <MapContainer className="cf">
                      <Map coords={coordinates} marker search={false} zoom={14} />
                    </MapContainer>
                  </MapWrapper>
                )}
              </section>

              <section className="invoer">
                <header>
                  <Heading small>{intl.formatMessage(messages.extra_fields)}</Heading>
                </header>

                <label htmlFor="areaNotitie">{intl.formatMessage(messages.note)}</label>
                <Textarea
                  className="input"
                  name="notitie"
                  id="areaNotitie"
                  row="5"
                  placeholder={formatMessage(messages.note_remark)}
                  onChange={this.onInput}
                />

                <label htmlFor="inputFilledInBy">Ingevuld door:</label>
                <input className="input" id="inputFilledInBy" name="filled_in_by" onChange={this.onInput} />
              </section>

              <section>
                <header>
                  <Heading small>{intl.formatMessage(messages.export_cta)}</Heading>
                </header>

                <CSVDownloadContainer data={{ notitie, filledInBy }} />
              </section>
            </>
          )}
        </Aside>
      </div>
    );
  }
}

AccommodationObjectPageComponent.defaultProps = {
  coordinates: undefined,
  status: undefined,
};

AccommodationObjectPageComponent.propTypes = {
  coordinates: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  status: PropTypes.string,
  intl: intlShape.isRequired,
  loadBAGData: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      vboId: PropTypes.string,
      ligId: PropTypes.string,
      brkId: PropTypes.string,
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
