import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedNumber, FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { dataPropType } from 'utils/propTypes';
import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';
import messages from 'containers/App/messages';
import { findArrayDepth, isArray, isObject } from 'utils';

import { Key } from 'components/AccommodationObject/styled';

import Title from './components/Title';

const SectionWrapper = styled.section`
  position: relative;
`;

export const printValue = meta => {
  const { type, formattedValue } = meta;

  switch (type) {
    case 'number':
      return <FormattedNumber value={formattedValue} />;

    case 'currency':
      return (
        <FormattedNumber
          value={formattedValue}
          // disabling linter, because it will trip over the use of the 'style' prop
          // eslint-disable-next-line react/style-prop-object
          style="currency"
          currency="EUR"
          currencyDisplay="symbol"
          minimumFractionDigits={0}
          maximumFractionDigits={0}
        />
      );
    case 'surface':
      return (
        <FormattedNumber
          value={formattedValue}
          // eslint-disable-next-line react/no-children-prop
          children={formattedNumber => (
            <>
              {formattedNumber} m<sup>2</sup>
            </>
          )}
        />
      );
    default:
      return formattedValue;
  }
};

export const renderListItem = listItem => {
  let readableKey = listItem.formattedKey;

  if (isObject(readableKey) && readableKey.id) {
    readableKey = <FormattedMessage {...readableKey} values={{ entity: listItem.key }} />;
  }

  return (
    <li key={listItem.key || Math.random()} className={isArray(listItem) ? 'has-list' : null}>
      {isArray(listItem) ? (
        renderList(listItem)
      ) : (
        <>
          <Key>{readableKey}</Key>: {printValue(listItem)}
        </>
      )}
    </li>
  );
};

export const renderList = (listData, depth) => (
  <List className={depth >= 0 ? `depth-${depth}` : null}>
    {listData.map(listItem => {
      if (isArray(listItem.formattedValue)) {
        return listItem.formattedValue.map(fValue => renderListItem(fValue));
      }

      return renderListItem(listItem);
    })}
  </List>
);

export const SectionComponent = ({ name, href, data, intl: { formatMessage } }) => (
  <SectionWrapper>
    {name && data !== null && (
      <Title name={name} href={href} title={formatMessage(messages.to_stelselpedia, { name })} />
    )}

    {data === undefined && <LoadingIndicator />}
    {data && renderList(data, findArrayDepth(data))}
  </SectionWrapper>
);

SectionComponent.defaultProps = {
  href: '',
};

SectionComponent.propTypes = {
  name: PropTypes.string.isRequired,
  href: PropTypes.string,
  data: PropTypes.oneOfType([
    dataPropType,
    PropTypes.arrayOf(dataPropType),
    PropTypes.arrayOf(PropTypes.arrayOf(dataPropType)),
  ]),
  intl: intlShape.isRequired,
};

export default injectIntl(SectionComponent);
