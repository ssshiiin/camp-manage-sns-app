import React from "react";
import Checkbox from "@material-ui/core/Checkbox";

const CheckBoxes = (props) => {
  const [checked, setChecked] = React.useState(props.is_check);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    props.postIs_check(!checked, props.id);
  };

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "primary checkbox" }}
    />
  );
}

export default CheckBoxes;