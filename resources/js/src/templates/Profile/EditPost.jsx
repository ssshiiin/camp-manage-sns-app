import React, { useState, useEffect, forwardRef, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MenuItem from '@material-ui/core/MenuItem';

import { update } from '../../reducks/posts/operations';
import { ModalMediaQuery } from '../../components/Modal';
import { BolbImage, ImageError, InputText, SelectDate, SubmitButton, UploadButton } from '../../components/Form';
import { useDate, useString, useImage } from '../../Function';

import styles from '../../../../sass/templates/form.module.scss';

const EditPost = memo(
  forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const { post } = props;

    const postId = post.id;
    const [place, handlePlace] = useString(post.place);
    const [date, handleDate] = useDate(post.day);
    const [content, handleContent] = useString(post.content);
    const [bolb, image, handleImage] = useImage(post.image_path[0].image_path);
    const [errors, setErrors] = useState([]);
    const [open, setOpen] = useState(false);

    return (
      <ModalMediaQuery
        mb={360}
        top={20}
        left={50}
        transX={50}
        setOpen={setOpen}
        open={open}
        nav={'編集'}
        pull={true}
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
                <SubmitButton
                  label={'保存する'}
                  onClick={update(postId, place, date, content, image, setErrors, setOpen)}
                />
              </div>
            </form>
          </>
        }
      />
    );
  })
);

export default EditPost;
