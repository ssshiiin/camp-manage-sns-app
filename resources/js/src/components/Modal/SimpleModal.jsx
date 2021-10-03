import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery from 'react-responsive';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { ModalClose } from '../../reducks/modals/operations';

function getModalStyle(top, left, transX, transY, width) {
  return {
    width: `${typeof width !== 'undefined' ? width : 800}px`,
    top: `${top ? top : 0}%`,
    left: `${left ? left : 0}%`,
    transform: `translate(-${transX ? transX : 0}%, 
      -${transY ? transY : 0}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
  mobilePaper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0),
  },
}));

const SimpleModal = React.memo(
  React.forwardRef((props, ref) => {
    console.log('Modal');
    const classes = useStyles();
    const dispatch = useDispatch();
    const [modalStyle] = React.useState(getModalStyle(props.top, props.left, props.transX, props.transY, props.width));

    const body = (
      <React.Fragment>
        <MediaQuery query="(min-width: 767px)">
          <div style={modalStyle} className={classes.paper}>
            <div id="simple-modal-description">{props.body}</div>
          </div>
        </MediaQuery>
        <MediaQuery query="(max-width: 767px)">
          <div style={modalStyle} className={classes.mobilePaper}>
            <div id="simple-modal-description">{props.body}</div>
          </div>
        </MediaQuery>
      </React.Fragment>
    );

    return (
      <div>
        <MediaQuery query="(min-width: 767px)">
          <button
            type="button"
            onClick={() => dispatch(props.modalOpen())}
            style={{
              border: 'none',
              backgroundColor: 'white',
              minWidth: '212px',
              textAlign: 'left',
            }}
          >
            {props.nav}
          </button>
          <Modal
            open={props.open}
            onClose={() => dispatch(props.modalClose())}
            style={{
              overflow: 'scroll',
            }}
          >
            {body}
          </Modal>
        </MediaQuery>
        <MediaQuery query="(max-width: 767px)">
          <button
            type="button"
            onClick={() => dispatch(props.modalOpen())}
            style={{
              border: 'none',
              backgroundColor: 'white',
              minWidth: '50px',
              textAlign: 'left',
            }}
          >
            {props.nav}
          </button>
          <Modal open={props.open} onClose={() => dispatch(props.modalClose())} style={{ overflow: 'scroll' }}>
            {body}
          </Modal>
        </MediaQuery>
      </div>
    );
  })
);
export default SimpleModal;
