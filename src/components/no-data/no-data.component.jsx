import React from 'react';

import './no-data.styles.scss';

import { ReactComponent as NoDataSvg } from '../../assets/svg/undraw_no_data_qbuo.svg';

const NoData = ({ message }) => (
  <div className="no-data">
    <NoDataSvg />
    <h3 className="no-data__heading --maintext">Nothing Found {message}</h3>
  </div>
);

export default NoData;
