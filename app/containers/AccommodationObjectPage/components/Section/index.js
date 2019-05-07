import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedDate, FormattedMessage, FormattedNumber, injectIntl, intlShape } from 'react-intl';

import messages from 'containers/App/messages';
import { isArray, isObject } from 'utils';

import { Ul, Key } from '../../styled';

const printValue = meta => {
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

const Section = ({ cfg, data, intl }) => {
  const { formatMessage, locale } = intl;
  const { NAME, STELSELPEDIA_LINK } = cfg;
  const sectionData = data.length === 1 && isArray(data[0]) ? data[0] : data;
  const name = formatMessage(NAME);

  const renderList = listData => (
    <Ul>
      {listData.map(listItem => {
        let readableKey = listItem.formattedKey;

        if (isObject(readableKey) && readableKey.id) {
          readableKey = formatMessage(readableKey, { entity: listItem.key });
        }

        return (
          <li key={listItem.key || Math.random()}>
            {isArray(listItem) ? (
              renderList(listItem)
            ) : (
              <Fragment>
                <Key lang={locale}>{readableKey}</Key>: {printValue(listItem)}
              </Fragment>
            )}
          </li>
        );
      })}
    </Ul>
  );

  return (
    <Fragment key={name}>
      {name && (
        <Fragment>
          <h3 id={name}>
            {name}
            <a
              className="stelselpediaLink"
              href={STELSELPEDIA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              title={formatMessage(messages.to_stelselpedia, { name })}
            >
              <span>i</span>
            </a>
          </h3>
        </Fragment>
      )}

      {renderList(sectionData)}
    </Fragment>
  );
};

Section.propTypes = {
  cfg: PropTypes.shape({
    ABBR: PropTypes.string.isRequired,
    NAME: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    STELSELPEDIA_LINK: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  ]),
  intl: intlShape.isRequired,
};

export default injectIntl(Section);
