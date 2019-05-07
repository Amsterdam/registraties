import React from 'react';
import { FormattedDate, FormattedMessage, FormattedNumber } from 'react-intl';

export default meta => {
  const { type, formattedValue } = meta;

  switch (type) {
    case 'boolean':
      return <FormattedMessage {...formattedValue} />;
    case 'date':
      return <FormattedDate value={formattedValue} />;
    case 'number':
      return <FormattedNumber value={formattedValue} />;
    case 'currency':
      return (
        <FormattedNumber
          value={formattedValue}
          style="currency" // eslint-disable-line
          currency="EUR"
          currencyDisplay="symbol"
          minimumFractionDigits={0}
          maximumFractionDigits={0}
        />
      );
    case 'string':
    default:
      return formattedValue;
  }
};
