import React from 'react';
import { connect } from 'react-redux';

import './errorhandler.styles.scss';

import { setCurrentError } from '../../redux/errorReducer/error.actions';

class ErrorHandler extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      if (this.props.setCurrentError) {
        this.props.setCurrentError(null);
      }
    }, 4000);
  }

  render() {
    return (
      <p
        className="error --smallfont --maintext"
        style={{
          backgroundColor:
            this.props.currentError.status === 'failed' ? 'red' : 'lightgreen',
          display: this.props.currentError.message ? 'block' : 'none',
        }}
      >
        {this.props.currentError.message}
      </p>
    );
  }
}

const mapStateToProps = (state) => ({
  currentError: state.error.currentError,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentError: (error) => dispatch(setCurrentError(error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler);
