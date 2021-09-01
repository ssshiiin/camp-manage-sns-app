import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { ModalAction, StoreAction } from '../reducks/users/actions';;
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const open = selector.users.modal_open;
  const store = selector.users.store;


  const handleOpen = () => {
    dispatch(ModalAction({
      modal_open: true
    }))
  }

  const handleClose = () => {
    if (!store) {
      props.handleAlertOpen();
      return
    }
    else {
      dispatch(StoreAction({
        store: true
      }));
    }
    dispatch(ModalAction({
      modal_open: false
    }))
  }

  const body = (
    <React.Fragment>
      <Snackbar open={props.alertOpen} autoHideDuration={6000} onClose={props.handleAlertClose}>
        <Alert onClose={props.handleAlertClose} severity="warning">
          保存されていません
        </Alert>
      </Snackbar>
      <div style={modalStyle} className={classes.paper}>
        <div id="simple-modal-description">
          {props.body}
        </div>
      </div>
    </React.Fragment>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen} style={{ border: 'none', backgroundColor: 'white', minWidth: "180px", textAlign: "left" }}>
        {props.nav}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
