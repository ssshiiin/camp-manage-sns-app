import { useCallback, useState } from 'react';

const useImage = (initialState = '') => {
  const [bolb, setBolb] = useState(initialState);
  const [image, setImage] = useState(initialState);

  const handleState = useCallback(
    (event) => {
      const image = event.target.files[0];
      const bolbUrl = URL.createObjectURL(image);
      setBolb(bolbUrl);
      setImage(image);
    },
    [setBolb, setImage]
  );
  return [bolb, image, handleState, setBolb, setImage];
};

export default useImage;
