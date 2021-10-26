import React from 'react';
import styles from '../../../../sass/components/form.module.scss';

const BolbImage = (props) => {
  const { src, type } = props;

  const className = () => {
    switch (type) {
      case 'circle':
        return styles.bolb__circle;
      default:
        return styles.bolb;
    }
  };

  return <img src={src} className={className()} />;
};

export default BolbImage;
