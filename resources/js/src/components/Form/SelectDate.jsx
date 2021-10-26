import React from 'react';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { alpha } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import styles from '../../../../sass/components/form.module.scss';

const SelectDate = (props) => {
  const { value, onChange, label } = props;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        className={styles.date}
        id="date-picker-dialog"
        label={label}
        format="yyyy/MM/dd"
        value={value}
        variant="outlined"
        disableFuture="true"
        onChange={onChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default SelectDate;
