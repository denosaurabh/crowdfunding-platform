import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './popup-menu.styles.scss';

import { selectUniversitySettings } from '../../redux/UserUniversityReducer/university.selectors';
import { toggleUniversitySettings } from '../../redux/UserUniversityReducer/university.action';

import { ReactComponent as CutSvg } from '../../assets/svg/cut.svg';

const PopupMenu = ({
  children,
  show,
  width,
  height,
  toggleUniversitySettings,
}) => {
  if (show) {
    return (
      <div className="popup-menu">
        <div className="popup-menu-content" style={{ width, height }}>
          <CutSvg onClick={() => toggleUniversitySettings()} />
          {children}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const mapStateToProps = createStructuredSelector({
  show: selectUniversitySettings,
});

const mapDispatchToProps = (dispatch) => ({
  toggleUniversitySettings: () => dispatch(toggleUniversitySettings()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PopupMenu);
