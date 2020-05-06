import React from 'react';

import { ReactComponent as LoadingSvg } from '../../assets/svg/loading.svg';

import './withSpinner.styles.scss';

const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
  console.log(isLoading, otherProps, 'WITH SPINNER!');

  return isLoading ? <LoadingSvg /> : <WrappedComponent {...otherProps} />;
};

export default WithSpinner;
