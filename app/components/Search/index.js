import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Toggle from 'components/SearchToggle';
import Suggest from 'components/Suggest';

const Form = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #f5f5f5;

  @media (max-width: 1200px) {
    padding-top: 100px;
  }
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: bold;
  line-height: 25px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  border: #767676 solid 1px;
  height: 44px;
  padding: 9px 9px 11px;
  width: 100%;
  margin: 10px 0;

  &,
  &::placeholder {
    font-size: 1em;
  }

  &:focus {
    outline: #fec813 solid 4px;
    outline-offset: 0;
    border: black solid 1px;
  }
`;

const Hint = styled.div`
  font-size: 16px;
  line-height: 22px;
  color: #767676;
`;

const Wrapper = styled.div`
  max-width: 1024px;
  width: 100%;
  z-index: 1;
  position: relative;
`;

const Container = styled.div`
  min-width: 70px;
  max-width: 620px;
  margin: 0 auto;

  @media (max-width: 650px) {
    max-width: calc(100vw - 30px);
  }
`;

const SuggestWrapper = styled.div`
  position: absolute;
  min-width: 70px;
  max-width: 620px;
  width: 100%;
  top: calc(100% - 11px);
  z-index: -1;

  @media (max-width: 650px) {
    max-width: calc(100vw - 30px);
  }
`;

const StyledToggle = styled(Toggle)`
  position: absolute;
  right: 0;
  top: -50px;
`;

const FoldOut = styled.div`
  display: ${({ active }) => (active ? 'block' : 'none')};
  max-width: 620px;
  margin: 0 auto;
`;

const Search = forwardRef(
  (
    {
      formLegendLabel,
      onChange,
      onFocus,
      onSelect,
      onSuggestionSelect,
      onSubmit,
      results,
      suggestionResults,
      searchHintLabel,
      searchLabel,
      searchTermLabel,
      startFoldedOut,
      suggestRef,
    },
    ref,
  ) => {
    const [active, setActive] = useState(startFoldedOut);

    return (
      <Form action="" onSubmit={onSubmit} className="no-print" data-testid="search-form">
        <legend className="visuallyhidden">{formLegendLabel}</legend>

        <Wrapper>
          <StyledToggle
            data-testid="search-toggle"
            onClick={() => setActive(!active)}
            active={active}
            label={searchLabel}
          />

          <Container>
            <FoldOut active={active} data-testid="search-foldout">
              <Label htmlFor="searchInput">{searchTermLabel}</Label>
              <Hint>{searchHintLabel}</Hint>
              <Input
                autoCapitalize="off"
                autoCorrect="off"
                defaultValue=""
                autoComplete="off"
                id="searchInput"
                onChange={onChange}
                onFocus={onFocus}
                ref={ref}
                spellCheck={false}
                type="text"
              />
            </FoldOut>

            <SuggestWrapper ref={suggestRef}>
              <Suggest items={suggestionResults} onSelect={onSuggestionSelect} as="ul" />
              <Suggest items={results} onSelect={onSelect} as="ul" />
            </SuggestWrapper>
          </Container>
        </Wrapper>
      </Form>
    );
  },
);

Search.defaultProps = {
  onFocus: null,
  onSubmit: null,
  results: {},
  suggestionResults: {},
  suggestRef: undefined,
  startFoldedOut: false,
};

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  onSuggestionSelect: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  suggestionResults: PropTypes.shape({
    Straatnamen: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    ),
  }),
  results: PropTypes.shape({
    Adressen: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        brkId: PropTypes.string,
        vboId: PropTypes.string,
        ligId: PropTypes.string,
      }),
    ),
    'Kadastrale objecten': PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        brkId: PropTypes.string,
        vboId: PropTypes.string,
        ligId: PropTypes.string,
      }),
    ),
  }),
  suggestRef: PropTypes.shape({}),
  formLegendLabel: PropTypes.string.isRequired,
  searchLabel: PropTypes.string.isRequired,
  searchTermLabel: PropTypes.string.isRequired,
  searchHintLabel: PropTypes.string.isRequired,
  startFoldedOut: PropTypes.bool,
};

export default Search;
