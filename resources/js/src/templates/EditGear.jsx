import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Typography from '@material-ui/core/Typography';

import GearEditModal from '../../src/components/GearEditModal';
import { handleAlertClose, handleAlertOpen } from '../reducks/alerts/operations';
import {
  createGear,
  getShowGears,
  handleAmountChange, handleBrandChange, handleCategoryChange, handleGearNameChange,
  handleImageChange, handlePriceChange, handlePurchasedDayChange, updateGear
} from '../reducks/gears/operations';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  },
  bolb: {
    width: 400,
    objectFit: "cover"
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "#1876d1",
    color: "white"
  },
  buttonRoot: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: "none"
  },
  upImg: {
    margin: 7,
    backgroundColor: "#1876d1",
    color: "white"
  },
  textForm: {
    display: "flex",
    flexDirection: "column"
  }
}));


const EditGear = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const [mopen, setMOpen] = useState(false)

  const handleClick = async () => {
    await dispatch(getShowGears(props.gear_id));
    setMOpen(true);
  }

  const handleClose = () => {
    setMOpen(false);
  }

  const user_id = selector.users.user_id;
  const gear_name = selector.gears.gear_name;
  const category = selector.gears.gear_category;
  const purchased_day = selector.gears.gear_purchased_day;
  const brand = selector.gears.gear_brand;
  const price = selector.gears.gear_price;
  const amount = selector.gears.gear_amount;
  const bolb_urls = selector.gears.gear_bolb_urls
  const open = selector.modals.modal_gear_edit_open;
  const alertOpen = selector.alerts.open;
  const errors = selector.gears.create_errors;

  console.log(errors);


  return (
    <MenuItem>
      <GearEditModal
        alertOpen={alertOpen}
        handleAlertOpen={handleAlertOpen}
        handleAlertClose={handleAlertClose}
        modalOpen={handleClick}
        modalClose={handleClose}
        gear_id={props.gear_id}
        open={mopen}
        nav={"編集する"}
        body=
        {
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <img src={bolb_urls} className={classes.bolb} />
              {
                errors.img &&
                <>
                  <Typography variant="body2" color="error" align="center">
                    {errors.img}
                  </Typography>
                </>
              }
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
            <div className={classes.textForm}>
              <TextField
                error={(errors.gear_name !== undefined)}
                helperText={errors.gear_name}
                id="outlined-textarea"
                label="ギア"
                defaultValue={gear_name}
                placeholder="Placeholder"
                variant="outlined"
                onChange={(event) => dispatch(handleGearNameChange(event))}
              />
              <TextField
                error={(errors.category !== undefined)}
                helperText={errors.category}
                id="outlined-textarea"
                label="カテゴリー"
                defaultValue={category}
                placeholder="Placeholder"
                variant="outlined"
                onChange={(event) => dispatch(handleCategoryChange(event))}
              />
              <TextField
                error={(errors.brand !== undefined)}
                helperText={errors.brand}
                id="outlined-textarea"
                label="メーカー"
                defaultValue={brand}
                placeholder="Placeholder"
                variant="outlined"
                onChange={(event) => dispatch(handleBrandChange(event))}
              />
              <TextField
                error={(errors.price !== undefined)}
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
                    value={purchased_day}
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
                error={(errors.amount !== undefined)}
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
                onClick={() => dispatch(updateGear(props.gear_id))}
              >
                保存する
              </Button>
            </div>
          </form>
        }
      />
    </MenuItem>
  )
})

export default EditGear;