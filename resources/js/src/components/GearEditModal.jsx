import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useDispatch, useSelector } from 'react-redux';

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
    maxWidth: 1400,
    backgroundColor: theme.palette.background.paper,
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



const GearEditModal = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  console.log(props)

  const body = (
    <React.Fragment>
      <Snackbar open={props.alertOpen} autoHideDuration={6000} onClose={(event, reason) => dispatch(props.handleClose(event, reason))}>
        <Alert onClose={(event, reason) => dispatch(props.handleAlertClose(event, reason))} severity="warning">
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
      <button type="button" onClick={props.modalOpen} style={{ border: 'none', backgroundColor: 'white', minWidth: "180px", textAlign: "left" }}>
        {props.nav}
      </button>
      <Modal
        open={props.open}
        onClose={props.modalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div >
  );
})

export default GearEditModal;