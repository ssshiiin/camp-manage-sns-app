import Ract from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import styles from '../../../../sass/components/form.module.scss';

const SubmitButton = (props) => {
  const { label, onClick, fullWidth = false } = props;
  const dispatch = useDispatch();

  return (
    <Button
      variant="contained"
      className={styles.submit}
      startIcon={<CloudUploadIcon />}
      onClick={() => {
        dispatch(onClick());
      }}
      fullWidth={fullWidth}
    >
      {label}
    </Button>
  );
};

export default SubmitButton;
