const checkNIce = (nices, userId) => {
  const result = nices.filter((nice) => nice.user_id === userId);

  return [result.length ? true : false, nices.length];
};

export default checkNIce;
