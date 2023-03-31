export const removeMask = (param: string): string | undefined => {
  if (param) return param.replace(/[^0-9]+/g, '');
  return undefined;
};
