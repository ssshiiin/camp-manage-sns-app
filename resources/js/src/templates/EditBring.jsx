import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import MenuItem from '@material-ui/core/MenuItem';

import SimpleModal from '../../src/components/SimpleModal';
import { handleAlertClose, handleAlertOpen } from "../reducks/alerts/operations";
import { handleBringEditModalOpen } from "../reducks/modals/operations";
import { ShowAdd } from "../components";
import { AddAllIs_check, BringAllIs_check, createBringGear, deleteBringGear, getAddBringGear, getCountAllAdd, getCountAllBring } from "../reducks/bring_gears/operations";


const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto"
  },
  cardHeader: {
    padding: theme.spacing(1, 2)
  },
  list: {
    width: 190,
    height: 400,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto"
  },
  button: {
    margin: theme.spacing(0.5, 0)
  },
  nestRoot: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(2),
  }
}));

const EditBring = React.forwardRef((props, ref) => {
  console.log("Edit");
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const user_id = selector.users.user_id;
  const mopen = selector.modals.modal_bring_edit_open;
  const alertOpen = selector.alerts.open;
  const bring_gears = selector.bring_gears.bring_gears;
  const add_gears = selector.bring_gears.add_gears;
  const count_bring = selector.bring_gears.count_all;
  const count_add = selector.bring_gears.count_add_all;


  useEffect(() => {
    dispatch(getAddBringGear(user_id));
  }, [])

  const handleClick = (event, type) => {
    console.log(event.target.checked)
    if (type == "bring") {
      dispatch(BringAllIs_check(user_id, event.target.checked));
    }
    else if (type == "add") {
      dispatch(AddAllIs_check(user_id, event.target.checked));
    }
  }

  const customList = (title, categories, type, count) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={(event) => handleClick(event, type)}
            disabled={categories.length === 0}
            inputProps={{ "aria-label": "all gears selected" }}
          />
        }
        title={title}
        subheader={`${count.countTrue}/${count.countAll}selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {categories.map((category, i) =>
          <ShowAdd category={category} key={i} type={type} />
        )}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <MenuItem>
      <SimpleModal
        alertOpen={alertOpen}
        handleAlertOpen={handleAlertOpen}
        handleAlertClose={handleAlertClose}
        modalOpen={handleBringEditModalOpen}
        open={mopen}
        nav={"持ち物を編集する"}
        body={
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            className={classes.root}
          >
            <Grid item>{customList("持ち物", bring_gears, "bring", count_bring)}</Grid>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.button}
                  onClick={() => dispatch(deleteBringGear(user_id))}
                  aria-label="move selected right"
                >
                  &gt;
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.button}
                  onClick={() => dispatch(createBringGear(user_id))}
                  aria-label="move selected left"
                >
                  &lt;
                </Button>
              </Grid>
            </Grid>
            <Grid item>{customList("所持ギア", add_gears, "add", count_add)}</Grid>
          </Grid>}
      />
    </MenuItem >
  );
})

export default EditBring;
