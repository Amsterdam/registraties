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

    this.placeholder = this.props.intl.formatMessage(messages.search_placeholder);
    this.inputRef = createRef();

    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
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

  render() {
    const { results } = this.props;

    return (
      <Search
        onChange={this.onChange}
        onSelect={this.onSelect}
        onSubmit={event => {
          event.preventDefault();
        }}
        placeholder={this.placeholder}
        ref={this.inputRef}
        results={results}
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
