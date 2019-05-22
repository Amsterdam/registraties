import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import styled from 'styled-components';

import { SectionHeading } from 'containers/AccommodationObjectPage/styled';
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

const dataShape = {
  label: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  value: PropTypes.string.isRequired,
};

Summary.propTypes = {
  data: PropTypes.shape({
    RSIN: PropTypes.shape(dataShape),
    accommodation_object_id: PropTypes.shape(dataShape),
    cadastral_object_nr: PropTypes.shape(dataShape),
    chamber_of_commerce_nr: PropTypes.shape(dataShape),
    house_id: PropTypes.shape(dataShape),
    number_indication_id: PropTypes.shape(dataShape),
  }),
  intl: intlShape.isRequired,
};

Summary.defaultProps = {
  data: null,
};

export default Summary;
