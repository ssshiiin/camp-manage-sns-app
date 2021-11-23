import React, { useState, useEffect, memo, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MenuItem from '@material-ui/core/MenuItem';

import { ModalMediaQuery } from '../../components/Modal';
import { create } from '../../reducks/posts/operations';
import { BolbImage, ImageError, InputText, SelectDate, SubmitButton, UploadButton } from '../../components/Form';
import { useDate, useString, useImage } from '../../Function';

import styles from '../../../../sass/templates/form.module.scss';

const CreatePost = memo(
  forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);

    const [place, handlePlace, setPlace] = useString();
    const [date, handleDate, setDate] = useDate();
    const [content, handleContent, setContent] = useString();
    const [bolb, image, handleImage, setBolb, setImage] = useImage();
    const [errors, setErrors] = useState([]);
    const [open, setOpen] = useState(false);

    const resetState = () => {
      setPlace('');
      setDate(null);
      setContent('');
      setBolb('');
      setImage(null);
      setErrors([]);
      setOpen(false);
    };

    return (
      <ModalMediaQuery
        mb={360}
        top={20}
        left={50}
        transX={50}
        setOpen={setOpen}
        open={open}
        nav={'投稿'}
        body={
          <>
            <BolbImage src={bolb} />
            <form className={styles.postForm} noValidate autoComplete="off">
              <div className={styles.postForm__form}>
                <ImageError error={errors.img} />
                <UploadButton onChange={handleImage} />
                <InputText value={place} onChange={handlePlace} label={'キャンプ場'} error={errors.place} />
                <SelectDate value={date} onChange={handleDate} label={'日付'} />
                <InputText
                  value={content}
                  onChange={handleContent}
                  label={'キャプション'}
                  error={errors.content}
                  multiline={true}
                  rows={6}
                />
                <SubmitButton label={'保存する'} onClick={create(place, date, content, image, setErrors, resetState)} />
              </div>
            </form>
          </>
        }
      />
    );
  })
);

export default CreatePost;
