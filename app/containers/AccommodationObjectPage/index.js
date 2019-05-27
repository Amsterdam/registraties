import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';

import injectSaga from 'utils/injectSaga';
import CSVDownloadContainer from 'containers/CSVDownload';
import { loadBAGData } from 'containers/App/actions';
import { LOAD_DATA_SUCCESS } from 'containers/App/constants';
import messages from 'containers/App/messages';
import { makeSelectStatus } from 'containers/App/selectors';

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
import TOC from 'containers/TOC';
import Map from 'containers/Map';

import saga from './saga';

import { ArticleHeading, SectionHeading, Textarea, Aside, Input, Label } from './styled';

const Wrapper = styled.div`
  @media screen and (max-width: 920px) {
    flex-direction: column;

    & > * {
      padding-top: 1em;
      max-width: 100vw !important;

      &:first-child {
        border-top: 2px solid gray;
        margin-top: 30px;
      }
    }

    & > :first-child {
      order: 2;
    }
  }
`;

const AccommodationObjectPageComponent = props => {
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
    <Wrapper className="row justify-content-lg-between content-md-between">
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
        <TOC />

        <Summary />

        <Map marker search={false} zoom={14} />

        {status === LOAD_DATA_SUCCESS && (
          <>
            <section className="invoer">
              <header className="no-print">
                <SectionHeading>{intl.formatMessage(messages.extra_fields)}</SectionHeading>
              </header>

              <Label htmlFor="areaNotitie">{intl.formatMessage(messages.note)}:</Label>
              <Textarea
                className="input"
                name="notitie"
                id="areaNotitie"
                row="5"
                placeholder={formatMessage(messages.note_remark)}
                onChange={onInput}
              />

              <Label htmlFor="inputFilledInBy">{formatMessage(messages.filled_in_by)}:</Label>
              <Input className="input" id="inputFilledInBy" name="filled_in_by" onChange={onInput} />
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

const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadBAGData,
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectSaga({ key: 'global', saga }),
  withConnect,
  injectIntl,
)(AccommodationObjectPageComponent);
