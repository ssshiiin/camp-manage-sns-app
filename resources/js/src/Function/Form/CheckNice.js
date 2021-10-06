export const CheckNIce = (nices, userId) => {
  const result = nices.filter((nice) => nice.user_id === userId);

  console.log('Nices', nices);
  console.log('resutl', result);

  return [result.length ? true : false, nices.length];
};
