import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core';

import { ModalMediaQuery } from '../../components/Modal';
import { update } from '../../reducks/profiles/operations';
import { useImage, useString } from '../../Function';
import { BolbImage, ImageError, InputText, SubmitButton, UploadButton } from '../../components/Form';

import styles from '../../../../sass/templates/form.module.scss';

const EditProfile = React.forwardRef((props, ref) => {
  console.log('ModalProfile');
  const profiles = useSelector((state) => state.profiles);
  const profile = profiles.profile;

  const [name, handleName, setName] = useString('');
  const [content, handleContent, setContent] = useString('');
  const [bolb, image, handleImage, setBolb] = useImage('');
  const [errors, setErrors] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setName(profile.app_name);
    setContent(profile.profile);
    setBolb(profile.image_path);
  }, [profile]);

  return (
    <ModalMediaQuery
      mb={360}
      width={600}
      top={20}
      left={50}
      transX={50}
      setOpen={setOpen}
      open={open}
      nav={'プロフィール'}
      body={
        <>
          <form className={styles.postForm} noValidate autoComplete="off">
            <BolbImage src={bolb} type={'circle'} />
            <ImageError error={errors.img} />
            <UploadButton onChange={handleImage} />
            <div className={styles.postForm__form}>
              <InputText value={name} onChange={handleName} label={'ユーザーネーム'} error={errors.app_name} />
              <InputText
                value={content}
                onChange={handleContent}
                label={'プロフィール'}
                error={errors.profile}
                multiline={true}
                rows={4}
              />
              <SubmitButton label={'保存する'} onClick={update(name, content, image, setErrors, setOpen)} />
            </div>
          </form>
        </>
      }
    />
  );
});

export default EditProfile;
