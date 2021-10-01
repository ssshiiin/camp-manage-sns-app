import React from 'react';
import TextField from '@material-ui/core/TextField';

// props = {handleChange, errors, value}
const InputText = (props) => {
  return (
    <TextField
      error={errors.place !== undefined}
      helperText={errors.place}
      id="outlined-textarea"
      label="キャンプ場"
      defaultValue={place}
      placeholder="ふもとっぱら"
      variant="outlined"
      onChange={(event) => dispatch(handlePlaceChange(event))}
    />
  );
};

export default InputText;
