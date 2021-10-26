import React from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import styles from '../../../../sass/components/form.module.scss';

const InputText = (props) => {
  const {
    value,
    onChange,
    label,
    placeholder = '',
    error = false,
    fullWidth = false,
    multiline = false,
    rows = 1,
    required = false,
    autoFocus = false,
    type = 'text',
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
      error={error ? true : false}
      helperText={error}
      fullWidth={fullWidth}
      multiline={multiline}
      rows={rows}
      required={required}
      autoFocus={autoFocus}
      type={type}
      className={styles.text}
    />
  );
};

export default InputText;
