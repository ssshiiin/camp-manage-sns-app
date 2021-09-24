import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery from "react-responsive";

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { ModalClose } from '../reducks/modals/operations';

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
    padding: theme.spacing(4),
  },
  mobilePaper: {
    position: 'absolute',
    maxWidth: 1400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0),
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));



const SimpleModal = React.memo(React.forwardRef((props, ref) => {
  console.log("Modal")
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const dispatch = useDispatch();

  const body = (
    <React.Fragment>
      <Snackbar open={props.alertOpen} autoHideDuration={6000} onClose={(event, reason) => dispatch(props.handleAlertClose(event, reason))}>
        <Alert onClose={(event, reason) => dispatch(props.handleAlertClose(event, reason))} severity="warning">
          保存されていません
        </Alert>
      </Snackbar>
      <MediaQuery query="(min-width: 767px)" >
        <div style={modalStyle} className={classes.paper}>
          <div id="simple-modal-description">
            {props.body}
          </div>
        </div>
      </MediaQuery>
      <MediaQuery query="(max-width: 767px)" >
        <div style={modalStyle} className={classes.mobilePaper}>
          <div id="simple-modal-description">
            {props.body}
          </div>
        </div>
      </MediaQuery>
    </React.Fragment>
  );

  return (
    <div>
      <MediaQuery query="(min-width: 767px)" >
        <button type="button" onClick={() => dispatch(props.modalOpen(props.gear_id))} style={{ border: 'none', backgroundColor: 'white', minWidth: "50px", textAlign: "left" }}>
          {props.nav}
        </button>
        <Modal
          open={props.open}
          onClose={() => dispatch(ModalClose())}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </MediaQuery>
      <MediaQuery query="(max-width: 767px)" >
        <button type="button" onClick={() => dispatch(props.modalOpen(props.gear_id))} style={{ border: 'none', backgroundColor: 'white', minWidth: "50px", textAlign: "left" }}>
          {props.nav}
        </button>
        <Modal
          open={props.open}
          onClose={() => dispatch(ModalClose())}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{ overflow: "scroll", margin: "60px 0 60px 0" }}
        >
          {body}
        </Modal>
      </MediaQuery>
    </div >
  );
}))

export default SimpleModal;