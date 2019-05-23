import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Search from 'components/Search';

import { makeSelectResults } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { inputChanged, searchSelect } from './actions';
import messages from './messages';

const SearchContainer = props => {
  const inputRef = useRef();
  const suggestRef = useRef();
  const [showSuggest, setShowSuggest] = useState(true);

  const setup = () => {
    if (inputRef.current) inputRef.current.addEventListener('blur', onBlur, true);
    if (suggestRef.current) suggestRef.current.addEventListener('blur', onBlur, true);

    document.addEventListener('click', onClick, true);
  };

  const teardown = () => {
    if (inputRef.current) inputRef.current.removeEventListener('blur', onBlur);
    if (suggestRef.current) suggestRef.current.removeEventListener('blur', onBlur);

    document.removeEventListener('click', onClick);
  };

  useEffect(() => {
    setup();

    return teardown;
  }, [inputRef.current, suggestRef.current]);

  const onBlur = event => {
    const { relatedTarget } = event;
    const { current: input } = inputRef;
    const { current: suggest } = suggestRef;

    const blurFromInput = !input || (input !== null && !input.contains(relatedTarget));
    const blurFromSuggest = !suggest || (suggest !== null && !suggest.contains(relatedTarget));

    if (blurFromInput && blurFromSuggest) {
      setShowSuggest(false);
    }
  };

  const onFocus = () => {
    setShowSuggest(true);
  };

  const onChange = event => {
    event.persist();

    const { target } = event;

    props.onChange(target.value);
  };

  const onSelect = event => {
    event.preventDefault();
    event.persist();

    const {
      currentTarget: { dataset, text },
    } = event;

    props.onSearchSelect({ ...dataset });
    inputRef.current.value = text;
  };

  const onSubmit = event => {
    event.preventDefault();
  };

  const eventOutside = (event, eventType) => {
    const { type, target } = event;
    const { current: input } = inputRef;
    const { current: suggest } = suggestRef;

    const eventOutsideInput = !input || (input !== null && target !== input && !input.contains(target));
    const eventOutsideSuggest = !suggest || (suggest !== null && target !== suggest && !suggest.contains(target));
    return type === eventType && eventOutsideInput && eventOutsideSuggest;
  };

  const onClick = event => {
    const isClickOutside = eventOutside(event, 'click');

    if (isClickOutside && showSuggest !== isClickOutside) {
      setShowSuggest(!isClickOutside);
    }
  };

  const { intl, results } = props;
  const visibleResults = showSuggest ? results : {};

  return (
    <Search
      onChange={onChange}
      onFocus={onFocus}
      onSelect={onSelect}
      onSubmit={onSubmit}
      ref={inputRef}
      suggestRef={suggestRef}
      results={visibleResults}
      formLegendLabel={intl.formatMessage(messages.search_form_legend)}
      searchTermLabel={intl.formatMessage(messages.search_term)}
      searchHintLabel={intl.formatMessage(messages.search_hint)}
      searchLabel={intl.formatMessage(messages.search)}
      as="form"
    />
  );
};

SearchContainer.defaultProps = {
  results: undefined,
};

SearchContainer.propTypes = {
  intl: intlShape.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearchSelect: PropTypes.func.isRequired,
  results: PropTypes.shape({}),
};

const mapStateToProps = createStructuredSelector({
  results: makeSelectResults(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onChange: inputChanged,
      onSearchSelect: searchSelect,
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'search', reducer });
const withSaga = injectSaga({ key: 'search', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl,
)(SearchContainer);
