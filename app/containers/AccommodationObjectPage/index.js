import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';

import CSVDownloadContainer from 'containers/CSVDownload';
import withSelector from 'containers/withSelector';
import { loadBAGData } from 'containers/withSelector/actions';
import { OBJECTS, LOAD_DATA_SUCCESS } from 'containers/App/constants';
import messages from 'containers/App/messages';

import Verblijfsobject from 'components/Verblijfsobject';
import KadastraalObject from 'components/KadastraalObject';
import KadastraalSubjectNP from 'components/KadastraalSubjectNP';
import KadastraalSubjectNNP from 'components/KadastraalSubjectNNP';
import Nummeraanduiding from 'components/Nummeraanduiding';
import Pand from 'components/Pand';
import Vestiging from 'components/Vestiging';
import OpenbareRuimte from 'components/OpenbareRuimte';
import Gebied from 'components/Gebied';
import Adres from 'components/Adres';
import Summary from 'components/Summary';
import TOC from 'components/TOC';
import Map from 'components/Map';

import './style.scss';
import { MapWrapper, MapContainer, Heading, Textarea } from './styled';

export class AccommodationObjectPageComponent extends Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.toc = [];

    this.state = {
      notitie: '',
      toc: [],
    };

    this.onInput = this.onInput.bind(this);
  }

  initiateFetch() {
    this.setState({ toc: [] });
    const { vboId, ligId } = this.props.match.params;

    this.props.loadBAGData({ vboId, ligId });
  }

  componentDidMount() {
    this.initiateFetch();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.match.params.vboId !== this.props.match.params.vboId ||
      prevProps.match.params.ligId !== this.props.match.params.ligId
    ) {
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
      currentTarget: { value },
    } = event;

    this.setState({ notitie: value });
  }

  render() {
    const { intl, status, coordinates } = this.props;
    const { notitie, toc } = this.state;
    const { formatMessage } = intl;

    return (
      <div className="row">
        <article className="col-8">
          <section>
            <header>
              <Heading marginCollapse>{intl.formatMessage(messages.bag_objects)}</Heading>
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
              <Heading marginCollapse>{intl.formatMessage(messages.brk_objects)}</Heading>
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
          <TOC sections={toc} />

          {status === LOAD_DATA_SUCCESS && (
            <>
              <section>
                <header>
                  <Heading small>{intl.formatMessage(messages.overview)}</Heading>
                  <Adres />
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
                  <Heading small>{intl.formatMessage(messages.note)}</Heading>
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
                  <Heading small>{intl.formatMessage(messages.export_cta)}</Heading>
                </header>

                <CSVDownloadContainer data={{ notitie }} />
              </section>
            </>
          )}
        </aside>
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
