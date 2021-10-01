import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import MediaQuery from 'react-responsive';

import { SimpleModal } from '../../components/Modal';
import { handleAlertClose, handleAlertOpen } from '../../reducks/alerts/operations';
import { handleBringEditModalOpen } from '../../reducks/modals/operations';
import { ShowBring } from '../../components';
import {
  AddAllIs_check,
  BringAllIs_check,
  createBringGear,
  deleteBringGear,
  getAddBringGear,
} from '../../reducks/bring_gears/operations';
import { FlexListSubheader } from '../../components/Header';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    width: '100%',
  },
  cardHeader: {
    display: 'flex',
    padding: theme.spacing(1, 1),
  },
  mobileCardHeader: {
    padding: theme.spacing(0),
  },
  list: {
    width: '100%',
    height: 400,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  mobileList: {
    width: '100%',
    height: 300,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  mobileButton: {
    margin: theme.spacing(0),
    width: '100%',
    marginTop: 10,
  },
}));

const EditBring = React.memo(
  React.forwardRef((props, ref) => {
    console.log('Edit');
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
    }, []);

    const handleClick = (event, type) => {
      console.log(event.target.checked);
      if (type == 'Bring') {
        dispatch(BringAllIs_check(user_id, event.target.checked));
      } else if (type == 'NotBring') {
        dispatch(AddAllIs_check(user_id, event.target.checked));
      }
    };

    const customList = (title, categories, type, count) => (
      <>
        <MediaQuery query="(min-width: 767px)">
          <Card>
            <div className={classes.cardHeader}>
              <ListItemIcon>
                <Checkbox onClick={(event) => handleClick(event, type)} disabled={categories.length === 0} />
              </ListItemIcon>
              <FlexListSubheader title={title} countTrue={count.countAll} countAll={count.countAll} />
            </div>
            <Divider />
            <List className={classes.list} dense component="div" role="list">
              {categories.map((category, i) => (
                <ShowBring category={category} type={type} mode={'Edit'} key={i} />
              ))}
              <ListItem />
            </List>
          </Card>
        </MediaQuery>
        <MediaQuery query="(max-width: 767px)">
          <Card>
            <div className={classes.cardHeader}>
              <Checkbox onClick={(event) => handleClick(event, type)} disabled={categories.length === 0} />
              <FlexListSubheader title={title} countTrue={count.countAll} countAll={count.countAll} />
            </div>
            <Divider />
            <List className={classes.mobileList} dense component="div" role="list">
              {categories.map((category, i) => (
                <ShowBring category={category} type={type} mode={'Edit'} key={i} />
              ))}
              <ListItem />
            </List>
          </Card>
        </MediaQuery>
      </>
    );

    return (
      <MenuItem>
        <SimpleModal
          top={50}
          left={50}
          transX={50}
          transY={50}
          alertOpen={alertOpen}
          handleAlertOpen={handleAlertOpen}
          handleAlertClose={handleAlertClose}
          modalOpen={handleBringEditModalOpen}
          open={mopen}
          nav={'持ち物を編集する'}
          body={
            <>
              <MediaQuery query="(min-width: 767px)">
                <Grid container spacing={6} justifyContent="center" alignItems="center" className={classes.root}>
                  <Grid item xs={5}>
                    {customList('持ち物', bring_gears, 'Bring', count_bring)}
                  </Grid>
                  <Grid item xs={2}>
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
                  <Grid item xs={5}>
                    {customList('所持ギア', add_gears, 'NotBring', count_add)}
                  </Grid>
                </Grid>
              </MediaQuery>
              <MediaQuery query="(max-width: 767px)">
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                  className={classes.root}
                  style={{ minWidth: 360 }}
                >
                  <Grid item xs={6}>
                    {customList('持ち物', bring_gears, 'bring', count_bring)}
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
                  <Grid item xs={6}>
                    {customList('所持ギア', add_gears, 'add', count_add)}
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
      </MenuItem>
    );
  })
);

export default EditBring;
