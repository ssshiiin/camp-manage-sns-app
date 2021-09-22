import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListSubheader from "@material-ui/core/ListSubheader";

export const Test = React.memo(() => {
  console.log("Test")
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const count_all = selector.bring_gears.count_all;

  return (
    <ListSubheader component="div" id="gearList">
      {count_all.countTrue}/{count_all.countAll}  selected
    </ListSubheader>
  )
})