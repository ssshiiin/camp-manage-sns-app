import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';

// props = {title, countTrue, countAll}
const ListHeader = (props) => {
  return (
    <>
      <ListItemText primary={`${props.title}`} style={{ flex: 'initial' }} />
      <ListItemText
        secondary={`${props.countTrue}/${props.countAll}  selected`}
        style={{ flex: '1', marginLeft: 20 }}
      />
    </>
  );
};

export default ListHeader;
