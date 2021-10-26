import { useCallback, useState } from 'react';

const useDate = (initialState = null) => {
  const [state, setState] = useState(initialState);

  const handleState = useCallback(
    (event) => {
      setState(event);
    },
    [setState]
  );
  return [state, handleState, setState];
};

export default useDate;
