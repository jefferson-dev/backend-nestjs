export const onlyNumbers = (param: string): string => {
  return param.replaceAll(/\D/g, '');
};
