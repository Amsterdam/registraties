import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { parse } from 'json2csv';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import { isArray, isArrayOfArrays, isObject } from 'utils';
import DownloadLink from 'components/DownloadLink';
import messages from 'containers/App/messages';
import { OBJECTS } from 'containers/App/constants';
import { makeSelectKadastraalObjectData } from 'containers/KadastraalObject/selectors';
import { makeSelectKadastraalSubjectNNPData } from 'containers/KadastraalSubjectNNP/selectors';
import { makeSelectKadastraalSubjectNPData } from 'containers/KadastraalSubjectNP/selectors';
import { makeSelectNummeraanduidingData, makeSelectGebiedData } from 'containers/Nummeraanduiding/selectors';
import { makeSelectOpenbareRuimteData } from 'containers/OpenbareRuimte/selectors';
import { makeSelectPandData } from 'containers/Pand/selectors';
import { makeSelectVerblijfsobjectData } from 'containers/Verblijfsobject/selectors';
import { makeSelectVestigingData } from 'containers/Vestiging/selectors';
import { makeSelectWoonplaatsData } from 'containers/Woonplaats/selectors';

const IntlDownloadLink = injectIntl(({ intl, ...rest }) => (
  <DownloadLink
    name={`${intl.formatMessage(messages.csv_file_name)}.csv`}
    target="_blank"
    rel="noopener noreferrer"
    {...rest}
  />
));

IntlDownloadLink.propTypes = {
  intl: intlShape,
};

export const plainTextMimetype = 'data:text/plain;charset=utf-8';

export const getData = dataset => {
  const obj = {};

  dataset.forEach(({ key, formattedValue }) => {
    if (isArrayOfArrays(formattedValue)) {
      formattedValue.forEach((value, index) => {
        const objKey = `${key}_${index + 1}`;

        obj[objKey] = obj[objKey] || {};

        value.forEach(val => {
          obj[objKey][val.key] = val.formattedValue;
        });
      });
    } else if (isArray(formattedValue)) {
      obj[key] = obj[key] || {};

      formattedValue.forEach(val => {
        obj[key][val.key] = val.formattedValue;
      });
    } else {
      obj[key] = formattedValue;
    }
  });

  return obj;
};

export class CSVDownloadContainer extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = prevState;

    Object.keys(OBJECTS)
      // make sure nextProps contains the expected keys
      .filter(key => nextProps[key])
      // only get the keys for values that aren't yet present in the state
      .filter(key => {
        const propOrStateHasData = !!(prevState.data[key] || nextProps[key]);
        const stateHasPropData = Object.keys(prevState.data).includes(key);

        return propOrStateHasData && !stateHasPropData;
      })
      .forEach(key => {
        const propsData = nextProps[key];
        const propAbbr = OBJECTS[key].ABBR;

        if (isArrayOfArrays(propsData)) {
          propsData.forEach((item, index) => {
            data.set(`${propAbbr}_${index + 1}`, { ...getData(item) });
          });
        } else {
          data.set(propAbbr, getData(propsData));
        }
      });

    return { data };
  }

  /**
   * Get the configuration that is needed to pass on to the csc2json `parse` method
   *
   * @param {Map} data - data set from which field names need to be extracted
   * @returns {Object}
   */
  static getParseConfig(data) {
    const unwind = new Set();
    const fields = new Set();

    const setFields = (obj, parentKey, separator = '.') =>
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        const joinedKey = [parentKey, key].filter(Boolean).join(separator);

        if (isObject(value)) {
          if (parentKey) {
            unwind.add(joinedKey);
          }

          setFields(value, joinedKey, separator);
        } else {
          fields.add(joinedKey);
        }
      });

    setFields(data);

    return { fields: [...fields], unwind: [...unwind] };
  }

  constructor(props) {
    super(props);

    const { formatDate, now } = this.props.intl;
    const data = new Map([['date', formatDate(now())]]);

    this.state = {
      data,
    };

    this.onClick = this.onClick.bind(this);
  }

  getMergedData() {
    const data = {};

    Object.keys(this.props.data).forEach(key => {
      data[key] = this.props.data[key];
    });

    this.state.data.forEach((value, key) => {
      data[key] = value;
    });

    return data;
  }

  getParsedData() {
    const data = this.getMergedData();

    const parseOptions = CSVDownloadContainer.getParseConfig(data);

    return parse(data, parseOptions);
  }

  onClick(event) {
    event.persist();

    const csv = this.getParsedData();

    if (navigator.msSaveBlob) {
      event.preventDefault();
      const blob = new Blob([csv], { type: `${plainTextMimetype};` });
      const fileName = `${this.props.intl.formatMessage(messages.csv_file_name)}.csv`;

      window.navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
      // eslint-disable-next-line no-param-reassign
      event.target.href = `${plainTextMimetype},${csv}`;
    }
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
  OPENBARE_RUIMTE: makeSelectOpenbareRuimteData,
  WOONPLAATS: makeSelectWoonplaatsData,
  NUMMERAANDUIDING: makeSelectNummeraanduidingData,
  VERBLIJFSOBJECT: makeSelectVerblijfsobjectData,
  PAND: makeSelectPandData,
  KADASTRAAL_OBJECT: makeSelectKadastraalObjectData,
  KADASTRAAL_SUBJECT_NNP: makeSelectKadastraalSubjectNNPData,
  KADASTRAAL_SUBJECT_NP: makeSelectKadastraalSubjectNPData,
  VESTIGING: makeSelectVestigingData,
  GEBIED: makeSelectGebiedData,
});

const withConnect = connect(mapStateToProps);
const Intl = injectIntl(CSVDownloadContainer);
const composed = compose(withConnect)(Intl);

export default composed;
