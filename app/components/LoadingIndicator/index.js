import React from 'react';
import Progress from '../Progress';

const LoadingIndicator = () => (
  <Progress variant="small" showLabel={false} type="undetermined" inline hasPrimaryColor />
);

export default LoadingIndicator;
