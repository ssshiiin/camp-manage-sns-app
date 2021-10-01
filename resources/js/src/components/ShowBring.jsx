import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { BringIs_check } from '../reducks/bring_gears/operations';
import { CheckBoxes } from './Form';
import { FlexListSubheader } from './Header';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    display: 'flex',
  },
  subHeader: {
    display: 'flex',
  },
}));

// props = {category, type, mode}
const ShowBring = React.memo((props) => {
  console.log('showBring');
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleNestClick = () => {
    setOpen(!open);
  };

  console.log(props.category);

  return (
    <>
      <ListItem
        role="listitem"
        button
        onClick={handleNestClick}
        className={classes.subHeader}
      >
        <FlexListSubheader
          title={props.category.category}
          countTrue={props.category.countTrue}
          countAll={props.category.countAll}
        />
        {open ? (
          <ExpandLess style={{ marginLeft: 'auto' }} />
        ) : (
          <ExpandMore style={{ marginLeft: 'auto' }} />
        )}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.category.gearList.map((gear, i) => (
            <ListItem key={i} style={{ padding: '0px 8px' }}>
              <ListItemIcon>
                <CheckBoxes
                  gear={gear}
                  updateIsCheck={BringIs_check}
                  type={props.type}
                />
              </ListItemIcon>
              <ListItemText primary={gear.gear_name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
});

export default ShowBring;
