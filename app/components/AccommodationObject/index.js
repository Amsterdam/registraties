import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';

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

export const AccommodationObjectComponent = props => {
  const [filledInBy, setFilledInBy] = useState('');
  const [notitie, setNotitie] = useState('');

  const initiateFetch = () => {
    const { vboId, ligId, brkId } = props.match.params;

    props.loadBAGData({ vboId, ligId, brkId });
  };

  const onInput = event => {
    event.persist();
    const {
      currentTarget: { name, value },
    } = event;

    if (name === 'filled_in_by') {
      setFilledInBy(value);
    } else {
      setNotitie(value);
    }
  };

  useEffect(() => {
    initiateFetch();
  }, [props.match.params]);

  const { intl, status } = props;
  const { formatMessage } = intl;

  return (
    <Wrapper>
      <Progress />
      <article className="col-7">
        <section>
          <header>
            <ArticleHeading marginCollapse>{intl.formatMessage(messages.bag_objects)}</ArticleHeading>
          </header>

          <OpenbareRuimte />

          <Woonplaats />

          <Nummeraanduiding />

          <Verblijfsobject />

          <Pand />
        </section>

        <section>
          <header>
            <ArticleHeading>{intl.formatMessage(messages.brk_objects)}</ArticleHeading>
          </header>

          <KadastraalObject />

          <KadastraalSubjectNP />

          <KadastraalSubjectNNP />

          <Vestiging />

          <Gebied />
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
};

AccommodationObjectComponent.defaultProps = {
  status: undefined,
};

AccommodationObjectComponent.propTypes = {
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
