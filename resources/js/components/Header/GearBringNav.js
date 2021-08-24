import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import SimpleModal from '../ReactUI/SimpleModal';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function GearBringNav(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [template_name, setTemplate_name] = useState("");
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event) => {
      setTemplate_name(event.target.value);
  };
    
  const handleSubmit = (event) => {
      alert('Create Template: ' + template_name);
      props.createTemplates(template_name);
      event.preventDefault();
  }
  
  const classes = useStyles();

    return (
        <div className="GearBringNav">
            <Button
                className="BringNavButton"
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleClick}
                style={{border: 'none', backgroundColor: 'white'}}
            >
                <MoreHorizIcon fontSize="large" />
            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem>
                    <Link to={`/${props.user_id}/bring_lists/add`}>ギアを追加する</Link>
                </MenuItem>
                <MenuItem>
                    <button onClick={props.allDeleteBringGear} style={{border: 'none', backgroundColor: 'white'}}>持ち物リストをリセットする</button>
                </MenuItem>
                <MenuItem>
                    <SimpleModal 
                        nav={"テンプレートを作る"} 
                        body=
                            {
                            <form onSubmit={handleSubmit}>
                                <label>
                                    テンプレートとして保存する:
                                    <input type="text" value={template_name} onChange={handleChange} />
                                </label>
                                <input type="submit" value="保存" />
                            </form>
                            }
                        createTemplates={props.createTemplates}
                        />
                </MenuItem>
                <MenuItem>
                    <SimpleModal 
                        nav={"テンプレートを使う"}
                        body=
                            {
                                <Paper className={classes.paper}>
                                    <MenuList>
                                        {props.templates.map((template) => (
                                            <MenuItem 
                                                key={template.template_name}
                                                onClick={()=>props.useTemplates(template.template_name)}
                                                >{template.template_name}</MenuItem>
                                        ))}
                                    </MenuList>
                                </Paper>
                            }
                    />
                </MenuItem>
                <MenuItem>
                    <SimpleModal 
                        nav={"テンプレートの削除"}
                        body=
                            {
                                <Paper className={classes.paper}>
                                    <MenuList>
                                        {props.templates.map((template) => (
                                            <MenuItem 
                                                key={template.template_name}
                                                onClick={()=>props.deleteTemplate(template.template_name)}
                                                >{template.template_name}</MenuItem>
                                        ))}
                                    </MenuList>
                                </Paper>
                            }
                    />
                </MenuItem>
            </StyledMenu>
        </div>
    );
}
