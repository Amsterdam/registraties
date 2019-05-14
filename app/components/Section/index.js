import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';

import LoadingIndicator from 'components/LoadingIndicator';
import messages from 'containers/App/messages';
import { isArray, isObject } from 'utils';

import { Ul, Key, StelselpediaLink, SectionHeading } from 'containers/AccommodationObjectPage/styled';
import printValue from 'containers/AccommodationObjectPage/printValue';

const SectionWrapper = styled.section`
  position: relative;
`;

const Section = ({ cfg, data, intl }) => {
  const { formatMessage, locale } = intl;
  const { NAME, STELSELPEDIA_LINK } = cfg;
  const sectionData = data && data.length === 1 && isArray(data[0]) ? data[0] : data;
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
              <>
                <Key lang={locale}>{readableKey}</Key>: {printValue(listItem)}
              </>
            )}
          </li>
        );
      })}
    </Ul>
  );

  const Title = () => (
    <SectionHeading marginCollapse id={name}>
      {name}
      <StelselpediaLink
        href={STELSELPEDIA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        title={formatMessage(messages.to_stelselpedia, { name })}
      >
        <span>i</span>
      </StelselpediaLink>
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
