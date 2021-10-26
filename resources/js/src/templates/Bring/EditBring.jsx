import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import MediaQuery from 'react-responsive';

import { SimpleModal } from '../../components/Modal';
import {
  updateNotBringsAllCheck,
  updateBringsAllCheck,
  updateBringCheck,
  updateNotBringCheck,
  create,
  destroy,
} from '../../reducks/bring_gears/operations';
import { CardCustomList } from '../../components/Card';

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
    const bringGears = useSelector((state) => state.bring_gears);
    const userId = users.user_id;
    const brings = bringGears.brings;
    const notBrings = bringGears.not_brings;
    const countAllBrings = bringGears.brings_count_all;
    const countTrueBrings = bringGears.brings_count_true;
    const countAllNotBrings = bringGears.not_brings_count_all;
    const countTrueNotBrings = bringGears.not_brings_count_true;

    const [open, setOpen] = useState(false);

    return (
      <>
        <MediaQuery query="(min-width: 767px)">
          <SimpleModal
            top={50}
            left={50}
            transX={50}
            transY={50}
            setOpen={setOpen}
            open={open}
            nav={'追加'}
            body={
              <>
                <Grid container spacing={6} justifyContent="center" alignItems="center" className={classes.root}>
                  <Grid item xs={5}>
                    <CardCustomList
                      userId={userId}
                      title={'持ち物'}
                      categories={brings}
                      update={updateBringCheck}
                      updateAll={updateBringsAllCheck}
                      countAll={countAllBrings}
                      countTrue={countTrueBrings}
                    />
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
                    <CardCustomList
                      userId={userId}
                      title={'所持ギア'}
                      categories={notBrings}
                      update={updateNotBringCheck}
                      updateAll={updateNotBringsAllCheck}
                      countAll={countAllNotBrings}
                      countTrue={countTrueNotBrings}
                    />
                  </Grid>
                </Grid>
              </>
            }
          />
        </MediaQuery>
        <MediaQuery query="(max-width: 767px)">
          <SimpleModal
            top={50}
            left={50}
            transX={50}
            transY={50}
            width={360}
            setOpen={setOpen}
            open={open}
            nav={'持ち物を編集する'}
            body={
              <>
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                  className={classes.root}
                  style={{ minWidth: 360 }}
                >
                  <Grid item xs={6}>
                    <CardCustomList
                      userId={userId}
                      title={'持ち物'}
                      categories={brings}
                      update={updateBringCheck}
                      updateAll={updateBringsAllCheck}
                      countAll={countAllBrings}
                      countTrue={countTrueBrings}
                    />
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
                    <CardCustomList
                      userId={userId}
                      title={'所持ギア'}
                      categories={notBrings}
                      update={updateNotBringCheck}
                      updateAll={updateNotBringsAllCheck}
                      countAll={countAllNotBrings}
                      countTrue={countTrueNotBrings}
                    />
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
              </>
            }
          />
        </MediaQuery>
      </>
    );
  })
);

export default EditBring;
