import React, { Component, createRef } from 'react';
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

class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.inputRef = createRef();
    this.suggestRef = createRef();

    this.state = {
      showSuggest: true,
    };

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.inputRef.current.addEventListener('blur', this.onBlur, true);
    this.suggestRef.current.addEventListener('blur', this.onBlur, true);
    document.addEventListener('click', this.onClick, true);
  }

  componentWillUnmount() {
    this.inputRef.current.removeEventListener('blur', this.onBlur);
    this.suggestRef.current.removeEventListener('blur', this.onBlur);
    document.removeEventListener('click', this.onClick);
  }

  onBlur(event) {
    const { relatedTarget } = event;
    const { current: input } = this.inputRef;
    const { current: suggest } = this.suggestRef;

    const blurFromInput = !input || (input !== null && !input.contains(relatedTarget));
    const blurFromSuggest = !suggest || (suggest !== null && !suggest.contains(relatedTarget));

    if (blurFromInput && blurFromSuggest) {
      this.setState({ showSuggest: false });
    }
  }

  onFocus() {
    this.setState({ showSuggest: true });
  }

  onChange(event) {
    event.persist();

    const { target } = event;

    this.props.onChange(target.value);
  }

  onSelect(event) {
    event.preventDefault();
    event.persist();

    const {
      currentTarget: { dataset, text },
    } = event;

    this.props.onSearchSelect({ ...dataset });
    this.inputRef.current.value = text;
  }

  eventOutside(event, eventType) {
    const { type, target } = event;
    const { current: input } = this.inputRef;
    const { current: suggest } = this.suggestRef;

    const eventOutsideInput = !input || (input !== null && target !== input && !input.contains(target));
    const eventOutsideSuggest = !suggest || (suggest !== null && target !== suggest && !suggest.contains(target));
    return type === eventType && eventOutsideInput && eventOutsideSuggest;
  }

  onClick(event) {
    const isClickOutside = this.eventOutside(event, 'click');

    if (isClickOutside && this.state.showSuggest !== isClickOutside) {
      this.setState({ showSuggest: !isClickOutside });
    }
  }

  render() {
    const { results, intl } = this.props;
    const { showSuggest } = this.state;
    const visibleResults = showSuggest ? results : {};

    return (
      <Search
        onChange={this.onChange}
        onFocus={this.onFocus}
        onSelect={this.onSelect}
        onSubmit={event => {
          event.preventDefault();
        }}
        placeholder={this.placeholder}
        ref={this.inputRef}
        suggestRef={this.suggestRef}
        results={visibleResults}
        formLegendLabel={intl.formatMessage(messages.search_form_legend)}
        searchTermLabel={intl.formatMessage(messages.search_term)}
        searchHintLabel={intl.formatMessage(messages.search_hint)}
        searchLabel={intl.formatMessage(messages.search)}
        as="form"
      />
    );
  }
}

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
