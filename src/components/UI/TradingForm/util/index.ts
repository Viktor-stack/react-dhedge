export const validateFiledForm = ({ balance = 0, rate = 0 }) => {
  let result = 0;
  result = balance * rate;
  return result;
};