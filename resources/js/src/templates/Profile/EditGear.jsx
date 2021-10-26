import React, { useState, useEffect, memo, forwardRef } from 'react';
import MenuItem from '@material-ui/core/MenuItem';

import { BolbImage, ImageError, InputText, SelectDate, SubmitButton, UploadButton } from '../../components/Form';

import { update } from '../../reducks/gears/operations';
import styles from '../../../../sass/templates/form.module.scss';
import { useDate, useImage, useString } from '../../Function';
import { ModalMediaQuery } from '../../components/Modal';

const EditGear = memo(
  forwardRef((props, ref) => {
    const { gear } = props;

    const gearId = gear.id;
    const [gearName, handleGearName, setGearName] = useString(gear.gear_name);
    const [category, handleCategory, setCategory] = useString(gear.category);
    const [brand, handleBrand, setBrand] = useString(gear.brand);
    const [amount, handleAmount, setAmount] = useString(gear.amount);
    const [price, handlePrice, setPrice] = useString(gear.price);
    const [date, handleDate, setDate] = useDate(gear.purchased_day);
    const [bolb, image, handleImage, setBolb, setImage] = useImage(gear.gear_images[0].image_path);
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
                <InputText value={gearName} onChange={handleGearName} label={'ギア'} error={errors.gear_name} />
                <InputText value={category} onChange={handleCategory} label={'カテゴリー'} error={errors.category} />
                <InputText value={brand} onChange={handleBrand} label={'メーカー'} error={errors.brand} />
                <InputText value={amount} onChange={handleAmount} label={'所持数'} error={errors.amount} />
                <InputText value={price} onChange={handlePrice} label={'購入額'} error={errors.price} />
                <SelectDate value={date} onChange={handleDate} label={'購入日'} />
                <SubmitButton
                  label={'保存する'}
                  onClick={update(gearId, gearName, category, brand, amount, price, date, image, setErrors, setOpen)}
                />
              </div>
            </form>
          </>
        }
      />
    );
  })
);

export default EditGear;
