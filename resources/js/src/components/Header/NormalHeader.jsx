import React, { memo } from 'react';
import MediaQuery from 'react-responsive';

const NormalHeader = memo((props) => {
  return (
    <>
      <MediaQuery query="(min-width: 767px)">
        <h2>{props.title}</h2>
      </MediaQuery>
      <MediaQuery query="(max-width: 767px)">
        {props.type === 'Site' ? (
          <h2>{props.title}</h2>
        ) : (
          <div className="logo" style={{ margin: '0 auto', height: 60, width: 60, paddingLeft: 10, marginTop: 10 }}>
            <img src={'/images/logoNarrow.png'} width="40px" height="40px" />
          </div>
        )}
      </MediaQuery>
    </>
  );
});

export default NormalHeader;
