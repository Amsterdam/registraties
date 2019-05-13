import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import styled from 'styled-components';

const Dt = styled.dt`
  font-family: Avenir Next LT W01 Demi;
`;

const Dd = styled.dd`
  padding-left: 1em;
`;

const Summary = ({ data, intl: { locale, formatMessage } }) =>
  Object.keys(data).length ? (
    <dl>
      {Object.keys(data).map(key => (
        <Fragment key={key}>
          <Dt lang={locale}>{formatMessage(data[key].label)}</Dt>
          <Dd>{data[key].value}</Dd>
        </Fragment>
      ))}
    </dl>
  ) : null;

Summary.propTypes = {
  data: PropTypes.shape({
    RSIN: PropTypes.shape({}),
    accommodation_object_id: PropTypes.shape({}),
    cadastral_object_nr: PropTypes.shape({}),
    chamber_of_commerce_nr: PropTypes.shape({}),
    house_id: PropTypes.shape({}),
    number_indication_id: PropTypes.shape({}),
  }),
  intl: intlShape.isRequired,
};

Summary.defaultProps = {
  data: null,
};

export default Summary;
