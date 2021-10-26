import React from 'react';
import Typography from '@material-ui/core/Typography';

const ImageError = (props) => {
  const { error } = props;

  return (
    <Typography variant="body2" color="error" align="center">
      {error}
    </Typography>
  );
};

export default ImageError;
