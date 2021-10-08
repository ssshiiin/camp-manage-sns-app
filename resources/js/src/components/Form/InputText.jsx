import React from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import styles from '../../../../sass/components/form.module.scss';

const InputText = (props) => {
  const dispatch = useDispatch();
  const {
    value,
    onChange,
    label,
    placeholder = '',
    error = false,
    fullWidth = false,
    multiline = false,
    rows = 1,
  } = props;

  return (
    <TextField
      size="small"
      id="outlined-textarea"
      label={label}
      defaultValue={value}
      placeholder={placeholder}
      variant="outlined"
      onChange={onChange}
      error={error[0] ? true : false}
      helperText={error[0]}
      fullWidth={fullWidth}
      multiline={multiline}
      rows={rows}
      className={styles.text}
    />
  );
};

export default InputText;
