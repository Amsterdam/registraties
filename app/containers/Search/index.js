import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { pushSearchHistoryLocalStorage } from 'utils/searchHistory';
import Search from 'components/Search';

import { makeSelectResults, makeSelectSuggestionResults } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { inputChanged, searchSelect } from './actions';
import { pushSearchHistory } from '../SearchHistory/actions';

import messages from './messages';

export const SearchContainerComponent = props => {
  const inputRef = useRef();
  const suggestRef = useRef();
  const [showSuggest, setShowSuggest] = useState(true);

  useEffect(() => {
    inputRef.current.addEventListener('focusout', onFocusOut, true);
    suggestRef.current.addEventListener('focusout', onFocusOut, true);
    document.addEventListener('click', onClick, true);

    return () => {
      inputRef.current.removeEventListener('focusout', onFocusOut);
      suggestRef.current.removeEventListener('focusout', onFocusOut);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const onFocusOut = event => {
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

    props.pushSearchHistory({ ...dataset, text });
    pushSearchHistoryLocalStorage({ ...dataset, text });

    props.onSearchSelect({ ...dataset });
    inputRef.current.value = text;
  };

  const onSuggestionSelect = event => {
    event.preventDefault();
    event.persist();

    const {
      currentTarget: { text },
    } = event;

    inputRef.current.value = `${text} `;
    props.onChange(`${text} `);
    inputRef.current.focus();
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

  const { intl, results, suggestionResults, show } = props;
  const visibleResults = showSuggest ? results : {};

  return (
    <Search
      onChange={onChange}
      onFocus={onFocus}
      onSelect={onSelect}
      onSuggestionSelect={onSuggestionSelect}
      onSubmit={onSubmit}
      ref={inputRef}
      suggestRef={suggestRef}
      suggestionResults={suggestionResults}
      results={visibleResults}
      formLegendLabel={intl.formatMessage(messages.search_form_legend)}
      searchTermLabel={intl.formatMessage(messages.search_term)}
      searchHintLabel={intl.formatMessage(messages.search_hint)}
      searchLabel={intl.formatMessage(messages.search)}
      as="form"
      startFoldedOut={show}
    />
  );
};

SearchContainerComponent.defaultProps = {
  results: undefined,
  suggestionResults: undefined,
  show: false,
};

SearchContainerComponent.propTypes = {
  intl: intlShape.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearchSelect: PropTypes.func.isRequired,
  pushSearchHistory: PropTypes.func.isRequired,
  results: PropTypes.shape({}),
  suggestionResults: PropTypes.shape({}),
  show: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  results: makeSelectResults,
  suggestionResults: makeSelectSuggestionResults,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onChange: inputChanged,
      onSearchSelect: searchSelect,
      pushSearchHistory,
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'search', reducer });
const withSaga = injectSaga({ key: 'search', saga });
const Intl = injectIntl(SearchContainerComponent);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Intl);
