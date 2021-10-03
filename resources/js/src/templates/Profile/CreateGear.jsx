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

import { SimpleModal } from '../../components/Modal';
import { closeModalGearCreate, openModalGearCreate } from '../../reducks/modals/operations';
import {
  create,
  handleAmountChange,
  handleBrandChange,
  handleCategoryChange,
  handleGearNameChange,
  handleImageChange,
  handlePriceChange,
  handlePurchasedDayChange,
} from '../../reducks/gears/operations';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4),
    display: 'flex',
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
    },
    minWidth: 300,
  },
  mobileRoot: {
    margin: theme.spacing(2),
    display: 'flex',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    minWidth: 300,
  },
  bolb: {
    minWidth: 800,
    width: 800,
    objectFit: 'cover',
  },
  mobileBolb: {
    minWidth: 300,
    width: 300,
    objectFit: 'cover',
  },
  buttonRoot: {
    '& > *': {
      margin: theme.spacing(1),
    },
    textAlign: 'right',
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#1876d1',
    color: 'white',
  },
  input: {
    display: 'none',
  },
  upImg: {
    margin: theme.spacing(2),
    backgroundColor: '#1876d1',
    color: 'white',
  },
  textForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  mobileTextForm: {
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100% - 32px)',
  },
}));

const CreateGear = memo(
  forwardRef((props, ref) => {
    console.log('ModalGear');
    const classes = useStyles();
    const dispatch = useDispatch();
    const gears = useSelector((state) => state.gears);
    const modals = useSelector((state) => state.modals);

    const gear_name = gears.gearName;
    const category = gears.category;
    const purchased_day = gears.purchasedDay;
    const brand = gears.brand;
    const price = gears.price;
    const amount = gears.amount;
    const bolbUrl = gears.bolbUrl;
    const errors = gears.errors;

    const open = modals.modalGearCreate;

    return (
      <MenuItem>
        <MediaQuery minWidth={767}>
          <SimpleModal
            top={20}
            left={50}
            transX={50}
            modalOpen={openModalGearCreate}
            modalClose={closeModalGearCreate}
            open={open}
            nav={'ギアを登録する'}
            body={
              <>
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
                      defaultValue={gear_name}
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
                        value={purchased_day}
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
                      onClick={() => {
                        dispatch(create());
                      }}
                    >
                      保存する
                    </Button>
                  </div>
                </form>
              </>
            }
          />
        </MediaQuery>
        <MediaQuery maxWidth={767}>
          <SimpleModal
            top={20}
            left={50}
            transX={50}
            width={300}
            modalOpen={openModalGearCreate}
            modalClose={closeModalGearCreate}
            open={open}
            nav={'ギアを登録する'}
            body={
              <>
                <img src={bolbUrl} className={classes.mobileBolb} />
                <form className={classes.mobileRoot} noValidate autoComplete="off">
                  <div className={classes.mobileTextForm}>
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
                      defaultValue={gear_name}
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
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="購入日"
                        format="yyyy/MM/dd"
                        value={purchased_day}
                        variant="outlined"
                        disableFuture="true"
                        onChange={(date) => dispatch(handlePurchasedDayChange(date))}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
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
                      onClick={() => {
                        dispatch(create());
                      }}
                    >
                      保存する
                    </Button>
                  </div>
                </form>
              </>
            }
          />
        </MediaQuery>
      </MenuItem>
    );
  })
);
export default CreateGear;
