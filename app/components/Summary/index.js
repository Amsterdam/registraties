import React, { Fragment } from 'react';
import { intlShape } from 'react-intl';
import styled from 'styled-components';

import { summaryPropType } from 'utils/propTypes';
import SectionHeading from 'components/SectionHeading';
import messages from 'containers/App/messages';
import LoadingIndicator from 'components/LoadingIndicator';

const Dt = styled.dt`
  font-family: Avenir Next LT W01 Demi;
`;

const Dd = styled.dd`
  padding-left: 1em;
`;

const Summary = ({ data, intl: { locale, formatMessage } }) => {
  if (!data) return null;

  const numItems = Object.keys(data).length;

  if (!numItems) return <LoadingIndicator />;

  return (
    <>
      <SectionHeading>{formatMessage(messages.overview)}</SectionHeading>
      <dl>
        {Object.keys(data).map(key => (
          <Fragment key={key}>
            <Dt lang={locale}>{formatMessage(data[key].label)}</Dt>
            <Dd>{data[key].value}</Dd>
          </Fragment>
        ))}
      </dl>
    </>
  );
};

Summary.propTypes = {
  data: summaryPropType,
  intl: intlShape.isRequired,
};

Summary.defaultProps = {
  data: null,
};

export default Summary;
