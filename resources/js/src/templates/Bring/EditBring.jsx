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
import { closeModalBringEdit, openModalBringEdit } from '../../reducks/modals/operations';
import { ShowBring } from '../../components';
import {
  updateNotBringsAllCheck,
  updateBringsAllCheck,
  updateBringCheck,
  updateNotBringCheck,
  create,
  destroy,
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
    const users = useSelector((state) => state.users);
    const modals = useSelector((state) => state.modals);
    const bringGears = useSelector((state) => state.bring_gears);
    const userId = users.user_id;
    const open = modals.modalBringEdit;
    const brings = bringGears.brings;
    const notBrings = bringGears.not_brings;
    const countAllBrings = bringGears.brings_count_all;
    const countTrueBrings = bringGears.brings_count_true;
    const countAllNotBrings = bringGears.not_brings_count_all;
    const countTrueNotBrings = bringGears.not_brings_count_true;

    const handleClick = (event, type) => {
      console.log(event.target.checked);
      if (type == 'Bring') {
        dispatch(updateBringsAllCheck(userId, event.target.checked));
      } else if (type == 'NotBring') {
        dispatch(updateNotBringsAllCheck(userId, event.target.checked));
      }
    };

    const customList = (title, categories, updateIsCheck, countAll, countTrue, type) => (
      <>
        <MediaQuery query="(min-width: 767px)">
          <Card>
            <div className={classes.cardHeader}>
              <ListItemIcon>
                <Checkbox
                  onClick={(event) => handleClick(event, type)}
                  disabled={categories.length === 0}
                />
              </ListItemIcon>
              <FlexListSubheader title={title} countTrue={countTrue} countAll={countAll} />
            </div>
            <Divider />
            <List className={classes.list} dense component="div" role="list">
              {categories.map((category, i) => (
                <ShowBring category={category} updateIsCheck={updateIsCheck} key={i} />
              ))}
              <ListItem />
            </List>
          </Card>
        </MediaQuery>
        <MediaQuery query="(max-width: 767px)">
          <Card>
            <div className={classes.cardHeader}>
              <Checkbox
                onClick={(event) => handleClick(event, type)}
                disabled={categories.length === 0}
              />
              <FlexListSubheader title={title} countTrue={countTrue} countAll={countAll} />
            </div>
            <Divider />
            <List className={classes.mobileList} dense component="div" role="list">
              {categories.map((category, i) => (
                <ShowBring category={category} updateIsCheck={updateIsCheck} key={i} />
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
          modalOpen={openModalBringEdit}
          modalClose={closeModalBringEdit}
          open={open}
          nav={'持ち物を編集する'}
          body={
            <>
              <MediaQuery query="(min-width: 767px)">
                <Grid
                  container
                  spacing={6}
                  justifyContent="center"
                  alignItems="center"
                  className={classes.root}
                >
                  <Grid item xs={5}>
                    {customList(
                      '持ち物',
                      brings,
                      updateBringCheck,
                      countAllBrings,
                      countTrueBrings,
                      'Bring'
                    )}
                  </Grid>
                  <Grid item xs={2}>
                    <Grid container direction="column" alignItems="center">
                      <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={() => dispatch(destroy(userId))}
                        aria-label="move selected right"
                      >
                        &gt;
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={() => dispatch(create(userId))}
                        aria-label="move selected left"
                      >
                        &lt;
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item xs={5}>
                    {customList(
                      '所持ギア',
                      notBrings,
                      updateNotBringCheck,
                      countAllNotBrings,
                      countTrueNotBrings,
                      'NotBring'
                    )}
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
                    {customList(
                      '持ち物',
                      brings,
                      updateBringCheck,
                      countAllBrings,
                      countTrueBrings,
                      'Bring'
                    )}
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.mobileButton}
                      onClick={() => dispatch(destroy(userId))}
                      aria-label="move selected right"
                    >
                      &gt;
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    {customList(
                      '所持ギア',
                      notBrings,
                      updateNotBringCheck,
                      countAllNotBrings,
                      countTrueNotBrings,
                      'NotBring'
                    )}
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.mobileButton}
                      onClick={() => dispatch(create(userId))}
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
