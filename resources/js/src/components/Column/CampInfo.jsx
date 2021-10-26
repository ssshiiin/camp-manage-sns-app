import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styles from '../../../../sass/components/column.module.scss';

const CampInfo = (props) => {
  return (
    <Grid
      container
      item
      xs={12}
      justifyContent="center"
      alignItems="center"
      style={{ flexBasis: '13%', margin: '8px 0px' }}
    >
      <Grid item xs={12} sm={4}>
        <Typography variant="body1" align="center">
          {props.column}
        </Typography>
      </Grid>
      <Grid item xs={1} className={styles.divide}>
        <Typography variant="body1" align="center">
          :
        </Typography>
      </Grid>
      <Grid item xs={12} sm={7}>
        <Typography variant="body1" align="center">
          {props.info}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CampInfo;
