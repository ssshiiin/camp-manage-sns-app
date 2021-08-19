import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
}));

export default function SimpleListMenu(props) {
    let options = ["none"];
    props.templates.forEach(template => 
    options.push(template.template_name)
    );
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    
    const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
    };
    
    const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    console.log("test")
    props.useTemplates();
    };
    
    const handleClose = () => {
    setAnchorEl(null);
    };
    
    return (
    <div className={classes.root}>
        <List component="nav" aria-label="Device settings">
            <ListItem
                aria-haspopup="true"
                button
                aria-controls="lock-menu"
                aria-label="when device is locked"
                onClick={handleClickListItem}
            >
            <ListItemText
                primary="テンプレートを使う"
                secondary={options[selectedIndex]}
            />
            </ListItem>
        </List>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
            >
            {option}
          </MenuItem>
        ))}
        </Menu>
    </div>
    );
}
