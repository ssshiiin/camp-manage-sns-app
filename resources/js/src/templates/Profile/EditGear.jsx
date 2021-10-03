import React, { useState, useEffect, memo, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Typography from '@material-ui/core/Typography';
import MediaQuery from 'react-responsive';

import GearEditModal from '../../components/Modal/GearEditModal';
import {
  getShowGears,
  handleAmountChange,
  handleBrandChange,
  handleCategoryChange,
  handleGearNameChange,
  handleImageChange,
  handlePriceChange,
  handlePurchasedDayChange,
} from '../../reducks/gears/operations';
import { catchErrorsAction, getGearsAction } from '../../reducks/gears/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4),
    display: 'flex',
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
    },
    minWidth: 300,
  },
  bolb: {
    minWidth: 800,
    width: 800,
    objectFit: 'cover',
    maxHeight: 538,
  },
  mobileBolb: {
    minWidth: 300,
    width: 300,
    objectFit: 'cover',
    borderBottom: 'solid 1px rgb(219, 219, 219)',
  },
  textForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#1876d1',
    color: 'white',
  },
  buttonRoot: {
    '& > *': {
      margin: theme.spacing(1),
    },
    textAlign: 'right',
  },
  input: {
    display: 'none',
  },
  upImg: {
    margin: theme.spacing(2),
    backgroundColor: '#1876d1',
    color: 'white',
  },
}));

const EditGear = memo(
  forwardRef((props, ref) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const gears = useSelector((state) => state.gears);
    const gearName = gears.gearName;
    const category = gears.category;
    const purchasedDay = gears.purchasedDay;
    const brand = gears.brand;
    const price = gears.price;
    const amount = gears.amount;
    const bolbUrl = gears.bolbUrl;
    const errors = gears.errors;
    const image = gears.image;
    const [mopen, setMOpen] = useState(false);

    const handleClick = async () => {
      await dispatch(getShowGears(props.gearId));
      setMOpen(true);
    };

    const handleClose = () => {
      setMOpen(false);
    };

    const update = async (gearId, func) => {
      console.log('updateGear');
      const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;

      const data = new FormData();

      data.append('gear_name', gearName === null ? '' : gearName);
      data.append('category', category === null ? '' : category);
      data.append('brand', brand === null ? '' : brand);
      data.append(
        'purchased_day',
        purchasedDay === null ? '' : moment(purchasedDay).format('YYYY/MM/DD')
      );
      data.append('price', price === null ? '' : price);
      data.append('amount', amount === null ? '' : amount);
      data.append(`img`, image === null || typeof image === 'undefined' ? '' : image);
      data.append('_token', csrfToken);

      const url = `/gears/update/${gearId}`;
      await axios
        .post(url, data, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((res) => {
          dispatch(
            getGearsAction({
              gears: res.data.gearsProfile,
              countGears: res.data.countGears,
            })
          );
          func();
        })
        .catch((err) => {
          dispatch(
            catchErrorsAction({
              errors: err.response.data.errors,
            })
          );
        });
    };

    return (
      <MenuItem>
        <GearEditModal
          top={20}
          left={50}
          transX={50}
          modalOpen={handleClick}
          modalClose={handleClose}
          open={mopen}
          nav={'編集する'}
          body={
            <>
              <MediaQuery minWidth={767}>
                <img src={bolbUrl} className={classes.bolb} />
                <form className={classes.root} noValidate autoComplete="off">
                  <div className={classes.textForm}>
                    <div>
                      {errors.img && (
                        <>
                          <Typography variant="body2" color="error" align="center">
                            {errors.img}
                          </Typography>
                        </>
                      )}
                    </div>
                    <div className={classes.buttonRoot}>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                        onChange={(event) => dispatch(handleImageChange(event))}
                      />
                      <label htmlFor="icon-button-file">
                        <IconButton
                          className={classes.button}
                          aria-label="upload picture"
                          component="span"
                        >
                          <PhotoCamera />
                        </IconButton>
                      </label>
                    </div>
                    <TextField
                      error={errors.gear_name !== undefined}
                      helperText={errors.gear_name}
                      id="outlined-textarea"
                      label="ギア"
                      defaultValue={gearName}
                      placeholder="Placeholder"
                      variant="outlined"
                      onChange={(event) => dispatch(handleGearNameChange(event))}
                    />
                    <TextField
                      error={errors.category !== undefined}
                      helperText={errors.category}
                      id="outlined-textarea"
                      label="カテゴリー"
                      defaultValue={category}
                      placeholder="Placeholder"
                      variant="outlined"
                      onChange={(event) => dispatch(handleCategoryChange(event))}
                    />
                    <TextField
                      error={errors.brand !== undefined}
                      helperText={errors.brand}
                      id="outlined-textarea"
                      label="メーカー"
                      defaultValue={brand}
                      placeholder="Placeholder"
                      variant="outlined"
                      onChange={(event) => dispatch(handleBrandChange(event))}
                    />
                    <TextField
                      error={errors.amount !== undefined}
                      helperText={errors.amount}
                      id="outlined-textarea"
                      label="所持数"
                      defaultValue={amount}
                      placeholder="Placeholder"
                      variant="outlined"
                      onChange={(event) => dispatch(handleAmountChange(event))}
                    />
                    <TextField
                      error={errors.price !== undefined}
                      helperText={errors.price}
                      id="outlined-textarea"
                      label="購入額"
                      defaultValue={price}
                      placeholder="Placeholder"
                      variant="outlined"
                      onChange={(event) => dispatch(handlePriceChange(event))}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        id="date-picker-dialog"
                        label="購入日"
                        format="yyyy/MM/dd"
                        value={purchasedDay}
                        variant="outlined"
                        disableFuture="true"
                        onChange={(date) => dispatch(handlePurchasedDayChange(date))}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </MuiPickersUtilsProvider>
                    <Button
                      variant="contained"
                      className={classes.upImg}
                      startIcon={<CloudUploadIcon />}
                      onClick={() => update(props.gearId, handleClose)}
                    >
                      保存する
                    </Button>
                  </div>
                </form>
              </MediaQuery>
              <MediaQuery maxWidth={767}>
                <form className={classes.root} noValidate autoComplete="off">
                  <div className={classes.textForm}>
                    <div>
                      <img src={bolbUrl} className={classes.mobileBolb} />
                      {errors.img && (
                        <>
                          <Typography variant="body2" color="error" align="center">
                            {errors.img}
                          </Typography>
                        </>
                      )}
                    </div>
                    <div className={classes.buttonRoot}>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                        onChange={(event) => dispatch(handleImageChange(event))}
                      />
                      <label htmlFor="icon-button-file">
                        <IconButton
                          className={classes.button}
                          aria-label="upload picture"
                          component="span"
                        >
                          <PhotoCamera />
                        </IconButton>
                      </label>
                    </div>
                    <TextField
                      error={errors.gear_name !== undefined}
                      helperText={errors.gear_name}
                      id="outlined-textarea"
                      label="ギア"
                      defaultValue={gearName}
                      placeholder="Placeholder"
                      variant="outlined"
                      onChange={(event) => dispatch(handleGearNameChange(event))}
                    />
                    <TextField
                      error={errors.category !== undefined}
                      helperText={errors.category}
                      id="outlined-textarea"
                      label="カテゴリー"
                      defaultValue={category}
                      placeholder="Placeholder"
                      variant="outlined"
                      onChange={(event) => dispatch(handleCategoryChange(event))}
                    />
                    <TextField
                      error={errors.brand !== undefined}
                      helperText={errors.brand}
                      id="outlined-textarea"
                      label="メーカー"
                      defaultValue={brand}
                      placeholder="Placeholder"
                      variant="outlined"
                      onChange={(event) => dispatch(handleBrandChange(event))}
                    />
                    <TextField
                      error={errors.price !== undefined}
                      helperText={errors.price}
                      id="outlined-textarea"
                      label="購入額"
                      defaultValue={price}
                      placeholder="Placeholder"
                      variant="outlined"
                      onChange={(event) => dispatch(handlePriceChange(event))}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justifyContent="space-around">
                        <KeyboardDatePicker
                          margin="normal"
                          id="date-picker-dialog"
                          label="購入日"
                          format="yyyy/MM/dd"
                          value={purchasedDay}
                          variant="outlined"
                          disableFuture="true"
                          onChange={(date) => dispatch(handlePurchasedDayChange(date))}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                    <TextField
                      error={errors.amount !== undefined}
                      helperText={errors.amount}
                      id="outlined-textarea"
                      label="所持数"
                      defaultValue={amount}
                      placeholder="Placeholder"
                      variant="outlined"
                      onChange={(event) => dispatch(handleAmountChange(event))}
                    />
                    <Button
                      variant="contained"
                      className={classes.upImg}
                      startIcon={<CloudUploadIcon />}
                      onClick={() => update(props.gearId, handleClose)}
                    >
                      保存する
                    </Button>
                  </div>
                </form>
              </MediaQuery>
            </>
          }
        />
      </MenuItem>
    );
  })
);

export default EditGear;
