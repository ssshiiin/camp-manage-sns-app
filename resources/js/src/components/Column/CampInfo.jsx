import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';


const CampInfo = (props) => {
  return (
    <Grid container item xs={12} justifyContent="center" alignItems="center" style={{ flexBasis: "13%" }
    }>
      <Grid item xs={4}>
        <Typography variant="body1" align="center">
          {props.column}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography variant="body1" align="center">
          :
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography variant="body1" align="center">
          {props.info}
        </Typography>
      </Grid>
    </Grid >
  )
}

export default CampInfo;