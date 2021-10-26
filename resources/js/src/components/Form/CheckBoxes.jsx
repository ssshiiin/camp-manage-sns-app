import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch } from 'react-redux';

//props = {gear, updateIsCheck, type}
const CheckBoxes = (props) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState(props.gear.is_check);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    dispatch(props.update(!checked, props.gear.id));
  };
  onChange = { handleChange };

  return <Checkbox checked={checked} inputProps={{ 'aria-label': 'primary checkbox' }} />;
};

export default CheckBoxes;
