import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { parse } from 'json2csv';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import { isArray, isArrayOfArrays, isObject } from 'utils';
import * as selectors from 'containers/withSelector/selectors';
import DownloadLink from 'components/DownloadLink';
import messages from 'containers/App/messages';
import { OBJECTS } from 'containers/App/constants';

const IntlDownloadLink = injectIntl(({ intl, ...rest }) => (
  <DownloadLink name={`${intl.formatMessage(messages.csv_file_name)}.csv`} {...rest} />
));

IntlDownloadLink.propTypes = {
  intl: intlShape,
};

export const getData = dataset => {
  const obj = {};

  dataset.forEach(({ key, formattedValue }) => {
    obj[key] = formattedValue;
  });

  return obj;
};

class CSVDownloadContainer extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const data = new Map();

    Object.keys(OBJECTS)
      .filter(key => nextProps[key])
      .forEach(key => {
        const stateData = prevState.data[key];
        const propsData = nextProps[key];
        const propOrStateHasData = !!(stateData || propsData);
        const stateHasPropData = Object.keys(prevState.data).includes(key);
        const propAbbr = OBJECTS[key].ABBR;

        if (propOrStateHasData && !stateHasPropData) {
          if (isArrayOfArrays(propsData)) {
            propsData.forEach((item, index) => {
              data.set(`${propAbbr}_${index + 1}`, { ...getData(item) });
            });
          } else {
            data.set(propAbbr, getData(propsData));
          }
        }
      });

    if (!data.size) {
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

    const { locale } = this.props.intl;
    const date = new Intl.DateTimeFormat(locale).format(new Date());
    const data = { date };
    const unwind = [];

    this.state.data.forEach((value, key) => {
      data[key] = value;
    });

    Object.keys(this.props.data).forEach(key => {
      data[key] = this.props.data[key];
    });

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
    event.target.href = `data:text/plain;charset=utf-8,${csv}`;
  }

  render() {
    return <IntlDownloadLink onClick={this.onClick} />;
  }
}

CSVDownloadContainer.defaultProps = {
  data: {},
};

CSVDownloadContainer.propTypes = {
  data: PropTypes.shape({}),
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  OPENBARE_RUIMTE: selectors.makeSelectOpenbareRuimteData(),
  NUMMERAANDUIDING: selectors.makeSelectNummeraanduidingData(),
  VERBLIJFSOBJECT: selectors.makeSelectVerblijfsobjectData(),
  PAND: selectors.makeSelectPandData(),
  KADASTRAAL_OBJECT: selectors.makeSelectKadastraalObjectData(),
  KADASTRAAL_SUBJECT_NNP: selectors.makeSelectKadastraalSubjectNNPData(),
  KADASTRAAL_SUBJECT_NP: selectors.makeSelectKadastraalSubjectNPData(),
  VESTIGING: selectors.makeSelectVestigingData(),
  GEBIED: selectors.makeSelectGebiedData(),
});

const withConnect = connect(mapStateToProps);

const composed = compose(
  withConnect,
  injectIntl,
)(CSVDownloadContainer);

export default composed;
