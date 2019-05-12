import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Suggest from 'components/Suggest';

const Form = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;

  legend {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
`;

const Input = styled.input`
  border: #767676 solid 1px;
  height: 44px;
  padding: 9px 9px 11px;
  width: 100%;

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

const StyledSuggest = styled(Suggest)`
  background: white;
  position: absolute;
  border: #767676 solid 1px;
  min-width: 70px;
  max-width: 620px;
  width: 100%;
  top: calc(100% - 4px);
  padding-top: 8px !important;
`;

const Wrapper = styled.div`
  min-width: 70px;
  max-width: 620px;
  width: 100%;
`;

const Search = forwardRef(({ onChange, onSelect, results, placeholder }, ref) => (
  <Form action="">
    <Wrapper>
      <Input
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        placeholder={placeholder}
        spellCheck={false}
        type="text"
        defaultValue=""
        onKeyUp={onChange}
        ref={ref}
      />
      {results.length > 0 && <StyledSuggest items={results} onSelect={onSelect} />}
    </Wrapper>
  </Form>
));

Search.defaultProps = {
  placeholder: '',
  results: [],
};

Search.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Search;
