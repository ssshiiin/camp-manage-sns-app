import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListSubheader from "@material-ui/core/ListSubheader";

const AllSelected = React.memo(() => {
  console.log("AllSelected")
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const count_all = selector.bring_gears.brings_count_all;
  const count_true = selector.bring_gears.brings_count_true;

  return (
    <ListSubheader component="div" id="gearList">
      {count_true}/{count_all}  selected
    </ListSubheader>
  )
})

export default AllSelected;