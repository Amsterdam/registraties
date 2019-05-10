import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Search from 'components/Search';

import { makeSelectResults } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { inputChanged, searchSelect } from './actions';

class SearchContainer extends Component {
  constructor(props) {
    super(props);

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
      target: { dataset },
    } = event;

    this.props.onSearchSelect({ ...dataset });
  }

  render() {
    const { results } = this.props;

    return <Search onChange={this.onChange} results={results} onSelect={this.onSelect} />;
  }
}

SearchContainer.defaultProps = {
  results: [],
};

SearchContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSearchSelect: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.shape({})),
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
)(SearchContainer);
