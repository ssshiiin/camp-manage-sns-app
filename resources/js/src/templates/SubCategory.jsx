import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CardRank } from '../components/Card';
import Typography from '@material-ui/core/Typography';
import { useString } from '../Function';

const SubCategory = () => {
  const [ranking, setRanking] = useState([]);
  const [myRanking, setMyRanking] = useState([]);
  const getRanking = () => {
    axios.get('/schedule').then((res) => {
      setRanking(res.data.top);
      setMyRanking(res.data.my);
    });
  };

  const [search, handleSearch] = useString();

  useEffect(() => {
    getRanking();
  }, []);

  return (
    <div className="sub-category">
      <form>
        <input type="text" value={search} onChange={handleSearch} className="search" placeholder="# Search" />
      </form>
      <div className="paper">
        <Typography variant="h6" align="left" style={{ padding: 10, fontWeight: 700, fontSize: 20 }}>
          Top search
        </Typography>
        {ranking.map((rank, index) => (
          <CardRank index={index} rank={rank} key={index} />
        ))}
      </div>
      <div className="paper">
        <Typography variant="h6" align="left" style={{ padding: 10, fontWeight: 700, fontSize: 20 }}>
          My history
        </Typography>
        {myRanking.map((rank, index) => (
          <CardRank index={index} rank={rank} key={index} />
        ))}
      </div>
    </div>
  );
};

export default SubCategory;
