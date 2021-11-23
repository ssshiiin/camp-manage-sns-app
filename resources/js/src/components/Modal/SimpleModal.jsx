import React, { forwardRef, memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import styles from '../../../../sass/components/modal.module.scss';

function getModalStyle(top, left, transX, transY, width) {
  return {
    width: `${typeof width !== 'undefined' ? width : 800}px`,
    top: `${top ? top : 0}%`,
    left: `${left ? left : 0}%`,
    transform: `translate(-${transX ? transX : 0}%, 
      -${transY ? transY : 0}%)`,
  };
}

const SimpleModal = memo(
  forwardRef((props, ref) => {
    const { open, setOpen, nav, body, top, left, transX, transY, pull = false, width } = props;
    const dispatch = useDispatch();
    const [modalStyle] = useState(getModalStyle(top, left, transX, transY, width));

    const pullStyle = () => {
      return pull ? styles.modal__button__pull : styles.modal__button;
    };

    return (
      <div>
        <button onClick={() => setOpen(true)} className={pullStyle()}>
          {nav}
        </button>
        <Modal open={open} onClose={() => setOpen(false)} className={styles.modal}>
          <div style={modalStyle} className={styles.modal__paper}>
            <div id="simple-modal-description">{body}</div>
          </div>
        </Modal>
      </div>
    );
  })
);
export default SimpleModal;
