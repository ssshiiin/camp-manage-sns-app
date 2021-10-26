import { useCallback, useState } from 'react';

const useString = (initialState = '') => {
  const [state, setState] = useState(initialState);

  const handleState = useCallback(
    (event) => {
      setState(event.target.value);
    },
    [setState]
  );
  return [state, handleState, setState];
};

export default useString;
