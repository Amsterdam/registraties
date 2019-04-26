import React, { Component } from 'react';
import withSelector from 'containers/withSelector';
import CSVDownload from 'components/CSVDownload';

const CSVDownloadWithSelector = withSelector(CSVDownload);

class CSVDownloadContainer extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    // debugger;
  }

  render() {
    return <CSVDownloadWithSelector onClick={this.onClick} />;
  }
}

export default CSVDownloadContainer;
