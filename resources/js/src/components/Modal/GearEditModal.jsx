import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useDispatch, useSelector } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import MediaQuery from 'react-responsive';

function getModalStyle(top, left, transX, transY, width) {
  return {
    width: `${width !== null ? width : 800}`,
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

const GearEditModal = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle(props.top, props.left, props.transX, props.transY, props.width));

  const dispatch = useDispatch();

  const body = (
    <React.Fragment>
      <Snackbar
        open={props.alertOpen}
        autoHideDuration={6000}
        onClose={(event, reason) => dispatch(props.handleAlertClose(event, reason))}
      >
        <Alert onClose={(event, reason) => dispatch(props.handleAlertClose(event, reason))} severity="warning">
          保存されていません
        </Alert>
      </Snackbar>
      <MediaQuery minWidth={767}>
        <div style={modalStyle} className={classes.paper}>
          <div id="simple-modal-description">{props.body}</div>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={767}>
        <div style={modalStyle} className={classes.mobilePaper}>
          <div id="simple-modal-description">{props.body}</div>
        </div>
      </MediaQuery>
    </React.Fragment>
  );

  return (
    <div>
      <MediaQuery minWidth={767}>
        <button
          type="button"
          onClick={props.modalOpen}
          style={{
            border: 'none',
            backgroundColor: 'white',
            minWidth: '50px',
            textAlign: 'left',
          }}
        >
          {props.nav}
        </button>
        <Modal
          open={props.open}
          onClose={props.modalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{
            overflow: 'scroll',
          }}
        >
          {body}
        </Modal>
      </MediaQuery>
      <MediaQuery maxWidth={767}>
        <button
          type="button"
          onClick={props.modalOpen}
          style={{
            border: 'none',
            backgroundColor: 'white',
            minWidth: '50px',
            textAlign: 'left',
          }}
        >
          {props.nav}
        </button>
        <Modal
          open={props.open}
          onClose={props.modalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{ overflow: 'scroll' }}
        >
          {body}
        </Modal>
      </MediaQuery>
    </div>
  );
});

export default GearEditModal;
