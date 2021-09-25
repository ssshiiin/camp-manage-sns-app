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
import MediaQuery from "react-responsive";

import SimpleModal from '../../src/components/SimpleModal';
import { handleAlertClose, handleAlertOpen } from "../reducks/alerts/operations";
import { handleBringEditModalOpen } from "../reducks/modals/operations";
import { ShowAdd } from "../components";
import { createBringGear, createBrings, deleteBringGear, deleteBrings, getAddBringGear, getBringGear, getCountAllAdd, getCountAllBring, updateBringsAllCheck, updateNotBringsAllCheck } from "../reducks/bring_gears/operations";


const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    width: "100%"
  },
  cardHeader: {
    padding: theme.spacing(1, 2)
  },
  mobileCardHeader: {
    padding: theme.spacing(0)
  },
  list: {
    width: 190,
    height: 400,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto"
  },
  mobileList: {
    width: "100%",
    height: 300,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto"
  },
  button: {
    margin: theme.spacing(0.5, 0)
  },
  mobileButton: {
    margin: theme.spacing(0),
    width: "100%",
    marginTop: 10
  },
}));

const EditBring = React.memo(React.forwardRef((props, ref) => {
  console.log("Edit");
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const user_id = selector.users.user_id;
  const mopen = selector.modals.modal_bring_edit_open;
  const alertOpen = selector.alerts.open;
  const brings = selector.bring_gears.brings;
  const brings_count_all = selector.bring_gears.brings_count_all;
  const brings_count_true = selector.bring_gears.brings_count_true;
  const not_brings = selector.bring_gears.not_brings;
  const not_brings_count_all = selector.bring_gears.not_brings_count_all;
  const not_brings_count_true = selector.bring_gears.not_brings_count_true;


  const handleClick = (event, type) => {
    console.log(event.target.checked)
    if (type == "bring") {
      dispatch(updateBringsAllCheck(user_id, event.target.checked));
    }
    else if (type == "add") {
      dispatch(updateNotBringsAllCheck(user_id, event.target.checked));
    }
  }

  const customList = (title, categories, type, count_all, count_true) => (
    <>
      <MediaQuery query="(min-width: 767px)" >
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
            subheader={`${count_true}/${count_all}selected`}
          />
          <Divider />
          <List className={classes.list} dense component="div" role="list">
            {categories.map((category, i) =>
              <ShowAdd category={category} key={i} type={type} />
            )}
            <ListItem />
          </List>
        </Card>
      </MediaQuery>
      <MediaQuery query="(max-width: 767px)" >
        <Card>
          <CardHeader
            className={classes.mobileCardHeader}
            avatar={
              <Checkbox
                onClick={(event) => handleClick(event, type)}
                disabled={categories.length === 0}
                inputProps={{ "aria-label": "all gears selected" }}
              />
            }
            title={title}
            subheader={`${count_all}/${count_true}selected`}
          />
          <Divider />
          <List className={classes.mobileList} dense component="div" role="list">
            {categories.map((category, i) =>
              <ShowAdd category={category} key={i} type={type} />
            )}
            <ListItem />
          </List>
        </Card>
      </MediaQuery>
    </>
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
          <>
            <MediaQuery query="(min-width: 767px)" >
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                className={classes.root}
                style={{ minWidth: 360 }}
              >
                <Grid item>{customList("持ち物", brings, "bring", brings_count_all, brings_count_true)}</Grid>
                <Grid item>
                  <Grid container direction="column" alignItems="center">
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.button}
                      onClick={() => dispatch(deleteBrings(user_id))}
                      aria-label="move selected right"
                    >
                      &gt;
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.button}
                      onClick={() => dispatch(createBrings(user_id))}
                      aria-label="move selected left"
                    >
                      &lt;
                    </Button>
                  </Grid>
                </Grid>
                <Grid item>{customList("所持ギア", not_brings, "add", not_brings_count_all, not_brings_count_true)}</Grid>
              </Grid>
            </MediaQuery>
            <MediaQuery query="(max-width: 767px)" >
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                className={classes.root}
                style={{ minWidth: 360 }}
              >
                <Grid item>{customList("持ち物", brings, "bring", brings_count_all, brings_count_true)}
                  <Button
                    variant="outlined"
                    size="small"
                    className={classes.mobileButton}
                    onClick={() => dispatch(deleteBringGear(user_id))}
                    aria-label="move selected right"
                  >
                    &gt;
                  </Button>
                </Grid>
                <Grid item>{customList("所持ギア", not_brings, "add", not_brings_count_all, not_brings_count_true)}
                  <Button
                    variant="outlined"
                    size="small"
                    className={classes.mobileButton}
                    onClick={() => dispatch(createBringGear(user_id))}
                    aria-label="move selected left"
                  >
                    &lt;
                  </Button>
                </Grid>
              </Grid>
            </MediaQuery>
          </>
        }
      />
    </MenuItem >
  );
}))

export default EditBring;
