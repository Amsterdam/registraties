import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import equal from 'fast-deep-equal';

import CSVDownloadContainer from 'containers/CSVDownload';
import withSelector from 'containers/withSelector';
import { loadBAGData } from 'containers/withSelector/actions';
import { LOAD_DATA_SUCCESS } from 'containers/App/constants';
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
import Map from 'containers/Map';

import { ArticleHeading, SectionHeading, Textarea, Aside } from './styled';

export class AccommodationObjectPageComponent extends Component {
  constructor(props) {
    super(props);

    this.map = null;

    this.state = {
      filledInBy: '',
      notitie: '',
    };

    this.onInput = this.onInput.bind(this);
  }

  initiateFetch() {
    const { vboId, ligId, brkId } = this.props.match.params;

    this.props.loadBAGData({ vboId, ligId, brkId });
  }

  componentDidMount() {
    this.initiateFetch();
  }

  componentDidUpdate(prevProps) {
    if (!equal(prevProps.match.params, this.props.match.params)) {
      this.initiateFetch();
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
    const { intl, status } = this.props;
    const { notitie, filledInBy } = this.state;
    const { formatMessage } = intl;

    return (
      <div className="row justify-content-lg-between">
        <main className="col-7">
          <article>
            <header>
              <ArticleHeading marginCollapse>{intl.formatMessage(messages.bag_objects)}</ArticleHeading>
            </header>

            <OpenbareRuimte />

            <Woonplaats />

            <Nummeraanduiding />

            <Verblijfsobject />

            <Pand />
          </article>

          <article>
            <header>
              <ArticleHeading>{intl.formatMessage(messages.brk_objects)}</ArticleHeading>
            </header>

            <KadastraalObject />

            <KadastraalSubjectNP />

            <KadastraalSubjectNNP />

            <Vestiging />

            <Gebied />
          </article>
        </main>

        <Aside className="col-4">
          <TOC />

          <Summary />

          <Map marker search={false} zoom={14} />

          {status === LOAD_DATA_SUCCESS && (
            <>
              <section className="invoer no-print">
                <header>
                  <SectionHeading>{intl.formatMessage(messages.extra_fields)}</SectionHeading>
                </header>

                <label htmlFor="areaNotitie">{intl.formatMessage(messages.note)}:</label>
                <Textarea
                  className="input"
                  name="notitie"
                  id="areaNotitie"
                  row="5"
                  placeholder={formatMessage(messages.note_remark)}
                  onChange={this.onInput}
                />

                <label htmlFor="inputFilledInBy">{formatMessage(messages.filled_in_by)}:</label>
                <input className="input" id="inputFilledInBy" name="filled_in_by" onChange={this.onInput} />
              </section>

              <section className="no-print">
                <header>
                  <SectionHeading>{intl.formatMessage(messages.export_cta)}</SectionHeading>
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
  status: undefined,
};

AccommodationObjectPageComponent.propTypes = {
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
