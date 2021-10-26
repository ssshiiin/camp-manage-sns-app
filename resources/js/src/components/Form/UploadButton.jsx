import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import styles from '../../../../sass/components/form.module.scss';

const UploadButton = (props) => {
  const { onChange } = props;
  return (
    <div className={styles.upload__root}>
      <input accept="image/*" className={styles.upload__input} id="icon-button-file" type="file" onChange={onChange} />
      <label htmlFor="icon-button-file">
        <IconButton className={styles.upload} aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </div>
  );
};

export default UploadButton;
