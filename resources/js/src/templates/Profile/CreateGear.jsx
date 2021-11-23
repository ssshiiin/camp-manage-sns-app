import React, { useState, memo, forwardRef } from 'react';
import { useDispatch } from 'react-redux';

import { create } from '../../reducks/gears/operations';
import { BolbImage, ImageError, InputText, SelectDate, SubmitButton, UploadButton } from '../../components/Form';

import styles from '../../../../sass/templates/form.module.scss';
import { useDate, useImage, useString } from '../../Function';
import { ModalMediaQuery } from '../../components/Modal';

const CreateGear = memo(
  forwardRef((props, ref) => {
    const [gear, handleGear, setGear] = useString();
    const [category, handleCategory, setCategory] = useString();
    const [brand, handleBrand, setBrand] = useString();
    const [amount, handleAmount, setAmount] = useString();
    const [price, handlePrice, setPrice] = useString();
    const [date, handleDate, setDate] = useDate();
    const [bolb, image, handleImage, setBolb, setImage] = useImage();
    const [errors, setErrors] = useState([]);
    const [open, setOpen] = useState(false);

    const resetState = () => {
      setGear('');
      setCategory('');
      setBrand('');
      setAmount('');
      setPrice('');
      setDate(null);
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
        nav={'ギア登録'}
        body={
          <>
            <BolbImage src={bolb} />
            <form className={styles.postForm} noValidate autoComplete="off">
              <div className={styles.postForm__form}>
                <ImageError error={errors.img} />
                <UploadButton onChange={handleImage} />
                <InputText value={gear} onChange={handleGear} label={'ギア'} error={errors.gear_name} />
                <InputText value={category} onChange={handleCategory} label={'カテゴリー'} error={errors.category} />
                <InputText value={brand} onChange={handleBrand} label={'メーカー'} error={errors.brand} />
                <InputText value={amount} onChange={handleAmount} label={'所持数'} error={errors.amount} />
                <InputText value={price} onChange={handlePrice} label={'購入額'} error={errors.price} />
                <SelectDate value={date} onChange={handleDate} label={'購入日'} />
                <SubmitButton
                  label={'保存する'}
                  onClick={create(gear, category, brand, amount, price, date, image, setErrors, resetState)}
                />
              </div>
            </form>
          </>
        }
      />
    );
  })
);
export default CreateGear;
