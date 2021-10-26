import React from 'react';
import MediaQuery from 'react-responsive';
import { SimpleModal } from './';

const ModalMediaQuery = (props) => {
  const { open, setOpen, nav, body, top, left, transX, transY, pc, mb, pull } = props;

  return (
    <>
      <MediaQuery minWidth={767}>
        <SimpleModal
          width={pc}
          top={top}
          left={left}
          transX={transX}
          transY={transY}
          setOpen={setOpen}
          open={open}
          nav={nav}
          body={body}
          pull={pull}
        />
      </MediaQuery>
      <MediaQuery maxWidth={767}>
        <SimpleModal
          width={mb}
          top={top}
          left={left}
          transX={transX}
          transY={transY}
          setOpen={setOpen}
          open={open}
          nav={nav}
          body={body}
        />
      </MediaQuery>
    </>
  );
};

export default ModalMediaQuery;
