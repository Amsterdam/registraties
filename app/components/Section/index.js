import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedNumber } from 'react-intl';
import styled from 'styled-components';

import { dataPropType } from 'utils/propTypes';
import List from 'components/List';
import SectionHeading from 'components/SectionHeading';
import LoadingIndicator from 'components/LoadingIndicator';
import messages from 'containers/App/messages';
import { isArray, isArrayOfArrays, isObject } from 'utils';

import { Key, StelselpediaLink } from 'components/AccommodationObject/styled';

const SectionWrapper = styled.section`
  position: relative;
`;

const printValue = meta => {
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
        <>
          <FormattedNumber value={formattedValue} /> m<sup>2</sup>
        </>
      );
    default:
      return formattedValue;
  }
};

export const SectionComponent = ({ name, href, data, intl }) => {
  const { formatMessage, locale } = intl;
  const sectionData = data && data.length === 1 && isArray(data[0]) ? data[0] : data;

  const renderListItem = listItem => {
    let readableKey = listItem.formattedKey;

    if (isObject(readableKey) && readableKey.id) {
      readableKey = formatMessage(readableKey, { entity: listItem.key });
    }

    return (
      <li key={listItem.key || Math.random()}>
        {isArray(listItem) ? (
          renderList(listItem)
        ) : (
          <>
            <Key lang={locale}>{readableKey}</Key>: {printValue(listItem)}
          </>
        )}
      </li>
    );
  };

  const renderList = listData => (
    <List className={isArrayOfArrays(listData) ? 'is-nested' : null}>
      {listData.map(listItem => {
        if (isArray(listItem.formattedValue)) {
          return (
            <li key={listItem.key || Math.random()}>
              {listItem.formattedKey}
              {renderList(listItem.formattedValue)}
            </li>
          );
        }

        return renderListItem(listItem);
      })}
    </List>
  );

  const Title = () => (
    <SectionHeading marginCollapse id={name}>
      {name}
      {href && (
        <StelselpediaLink
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={formatMessage(messages.to_stelselpedia, { name })}
        >
          <span>i</span>
        </StelselpediaLink>
      )}
    </SectionHeading>
  );

  return (
    <SectionWrapper>
      {name && data !== null && <Title />}

      {data === undefined && <LoadingIndicator />}
      {data && renderList(sectionData)}
    </SectionWrapper>
  );
};

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
