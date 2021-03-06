import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import MediaQuery from 'react-responsive';

// props = {countTrue, countAll, title}
const FlexListSubheader = (props) => {
  return (
    <div style={{ display: 'flex' }}>
      <MediaQuery query="(min-width: 767px)">
        <ListItemText
          primary={props.title}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        />
        <ListItemText
          secondary={`${props.countTrue}/${props.countAll}  selected`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: 10,
          }}
        />
      </MediaQuery>
      <MediaQuery query="(max-width: 767px)">
        <ListItemText
          primary={props.title}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 0,
          }}
        />
        <ListItemText
          secondary={`${props.countTrue}/${props.countAll}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: 10,
          }}
        />
      </MediaQuery>
    </div>
  );
};

export default FlexListSubheader;
