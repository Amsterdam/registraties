import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { parse } from 'json2csv';

import { isArray, isObject } from 'utils';
import withSelector from 'containers/withSelector';
import DownloadLink from 'components/DownloadLink';

class CSVDownloadContainer extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const getData = dataset => {
      const obj = {};
      dataset.forEach(({ key, value }) => {
        obj[key] = value;
      });
      return obj;
    };

    const sectionCodes = {
      nummeraanduiding: 'num',
      verblijfsobject: 'vbo',
      pand: 'pnd',
      kadasterObject: 'brko',
      kadasterSubject: 'brks',
    };
    let data = {};

    Object.keys(nextProps)
      .filter(key => Object.keys(sectionCodes).includes(key))
      .forEach(key => {
        const propOrStateHasData = prevState.data[key] || nextProps[key];
        const stateHasPropData = Object.keys(prevState.data).includes(key);

        if (propOrStateHasData && !stateHasPropData) {
          data = { ...data, [sectionCodes[key]]: { ...getData(nextProps[key]) } };
        }
      });

    if (!Object.keys(data).length) {
      return null;
    }

    return { data };
  }

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    this.state = {
      data: {
        notitie: '',
        timestamp: 0,
      },
    };
  }

  getParsedData() {
    const reduce = (acc, val) => {
      if (isArray(val)) {
        acc.push(...val);
      } else {
        acc.push(val);
      }

      return acc;
    };

    const data = { timestamp: new Date().getTime(), ...this.state.data, ...this.props.data };
    const unwind = [];

    const getKeys = (obj, parentKey, separator = '.') =>
      Object.keys(obj)
        .filter(key => obj[key])
        .map(key => {
          const value = obj[key];
          const joinedKey = [parentKey, key].filter(Boolean).join(separator);

          if (isObject(value)) {
            return getKeys(value, joinedKey, separator);
          }

          if (isArray(value)) {
            if (parentKey) {
              unwind.push(joinedKey);
            }

            return value.map(item => getKeys(item, joinedKey, separator)).reduce(reduce, []);
          }

          return joinedKey;
        })
        .reduce(reduce, []);

    const fields = getKeys(data);
    const parseOptions = { fields, unwind };

    return parse(data, parseOptions);
  }

  async onClick(event) {
    event.persist();

    const csv = this.getParsedData();
    // eslint-disable-next-line no-param-reassign
    event.target.href += csv;
  }

  render() {
    return <DownloadLink onClick={this.onClick} />;
  }
}

CSVDownloadContainer.defaultProps = {
  data: {},
};

CSVDownloadContainer.propTypes = {
  data: PropTypes.shape({}),
};

const composed = compose(withSelector)(CSVDownloadContainer);

export default composed;
