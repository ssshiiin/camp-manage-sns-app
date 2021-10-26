import { push } from 'connected-react-router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { searchSchedulePlace } from '../../reducks/schedules/operations';
import styles from '../../../../sass/components/card.module.scss';

const CardRank = (props) => {
  const { index, rank } = props;
  const dispatch = useDispatch();

  const isTop3 = (index) => {
    if (index == 0) {
      return styles.rank__top;
    } else if (index == 1) {
      return styles.rank__2;
    } else {
      return styles.rank__3;
    }
  };

  const linkPush = () => {
    dispatch(push(`/site`));
    dispatch(searchSchedulePlace(rank.place));
  };

  return (
    <div className={styles.rank} onClick={linkPush}>
      <div className={isTop3(index)}>
        <div>
          <span className={styles.rank__index}>{index + 1}</span>
          <span className={styles.rank__index__count}>{rank.count} views</span>
        </div>
        <span className={styles.rank__place}>{rank.place}</span>
      </div>
    </div>
  );
};

export default CardRank;
