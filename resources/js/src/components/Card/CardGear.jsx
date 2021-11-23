import React, { useEffect } from 'react';
import moment from 'moment';
import MediaQuery from 'react-responsive';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { NavGear } from '../../templates/Profile';

import styles from '../../../../sass/components/card.module.scss';

const CardGear = (props) => {
  const gear = props.gear;
  const userId = props.userId;

  return (
    <Card className={styles.gear}>
      <CardMedia className={styles.gear__img} image={gear.gear_images[0].image_path} title="Gear image" />
      <div className={styles.gear__detail}>
        <CardContent className={styles.gear__detail__content}>
          <Typography variant="subtitle1">{gear.gear_name}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {gear.brand}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            価格 : {Number(gear.price).toLocaleString()} <br />
            所持数 : {gear.amount} <br />
            購入日 : {gear.purchased_day === null ? '' : moment(gear.purchased_day).format('YYYY/MM/DD')} <br />
          </Typography>
        </CardContent>
      </div>
      <NavGear userId={userId} gear={gear} />
    </Card>
  );
};

export default CardGear;
