import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {
  AddIs_check,
  BringIs_check,
} from '../../reducks/bring_gears/operations';
import { useDispatch } from 'react-redux';

//props = {gear, updateIsCheck, type}
const CheckBoxes = (props) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState(props.gear.is_check);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (props.type === 'Bring') {
      dispatch(BringIs_check(!checked, props.gear.id));
    } else if (props.type === 'NotBring') {
      dispatch(AddIs_check(!checked, props.gear.gear_id));
    }
  };

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  );
};

export default CheckBoxes;
