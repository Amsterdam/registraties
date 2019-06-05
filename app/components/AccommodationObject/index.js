import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import equal from 'fast-deep-equal';

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
import Progress from 'containers/Progress';

import CSVDownloadContainer from 'containers/CSVDownload';
import TOC from 'containers/TOC';
import Map from 'containers/Map';
import messages from 'containers/App/messages';
import { LOAD_DATA_SUCCESS } from 'containers/App/constants';
import SectionHeading from 'components/SectionHeading';
import ArticleHeading from 'components/ArticleHeading';

import { Textarea, Aside, Label, Wrapper } from './styled';

class AccommodationObjectComponent extends React.Component {
  constructor(props) {
    super(props);

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

  hasBagResults() {
    const summaryKeys = Object.keys(this.props.summary);

    return summaryKeys.some(key =>
      ['accommodation_object_id', 'house_id', 'public_space_id', 'number_indication_id'].includes(key),
    );
  }

  hasBrkResults() {
    return Object.keys(this.props.summary).includes('cadastral_object_nr');
  }

  render() {
    const { onInput } = this;
    const { filledInBy, notitie } = this.state;
    const { intl, status } = this.props;
    const { formatMessage } = intl;

    return (
      <Wrapper>
        <Progress />
        <article className="col-7">
          <section>
            {this.hasBagResults() && (
              <header data-testid="accommodationObjectBAGHeader">
                <ArticleHeading marginCollapse>{intl.formatMessage(messages.bag_objects)}</ArticleHeading>
              </header>
            )}

            <Woonplaats />

            <Nummeraanduiding />

            <OpenbareRuimte />

            <Gebied />

            <Verblijfsobject />

            <Pand />
          </section>

          <section>
            {this.hasBrkResults() && (
              <header data-testid="accommodationObjectBRKHeader">
                <ArticleHeading>{intl.formatMessage(messages.brk_objects)}</ArticleHeading>
              </header>
            )}

            <KadastraalObject />

            <KadastraalSubjectNP />

            <KadastraalSubjectNNP />

            <Vestiging />
          </section>
        </article>

        <Aside className="col-4">
          <section>
            <TOC />
          </section>

          <section>
            <Summary />
          </section>

          <Map marker search={false} zoom={14} />

          {status === LOAD_DATA_SUCCESS && (
            <>
              <section className="invoer">
                <header className="no-print">
                  <SectionHeading>{intl.formatMessage(messages.extra_fields)}</SectionHeading>
                </header>

                <Label className={!notitie ? 'no-print' : null} htmlFor="areaNotitie">
                  {intl.formatMessage(messages.note)}:
                </Label>
                <Textarea
                  className="input no-print"
                  name="notitie"
                  id="areaNotitie"
                  row="5"
                  placeholder={formatMessage(messages.note_remark)}
                  onChange={onInput}
                />
                <div data-testid="accommodation-object-notitie" className={`no-screen${!notitie ? 'no-print' : ''}`}>
                  {notitie}
                </div>

                <Label className={!filledInBy ? 'no-print' : null} htmlFor="inputFilledInBy">
                  {formatMessage(messages.filled_in_by)}:
                </Label>
                <input className="input no-print" id="inputFilledInBy" name="filled_in_by" onChange={onInput} />
                <div
                  data-testid="accommodation-object-filled-in-by"
                  className={`no-screen${!filledInBy ? 'no-print' : ''}`}
                >
                  {filledInBy}
                </div>
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
      </Wrapper>
    );
  }
}

AccommodationObjectComponent.defaultProps = {
  summary: undefined,
  status: undefined,
};

AccommodationObjectComponent.propTypes = {
  summary: PropTypes.shape({}),
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

export default AccommodationObjectComponent;
