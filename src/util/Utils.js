export const PoppinsRegular = 'poppinsregular';
export const PoppinsBold = 'poppinsbold';
export const PoppinsSemiBold = 'poppinssemibold';
export const PoppinsMedium = 'poppinsmedium';

export const isArrayCheck = arr => {
  return Array.isArray(arr) && arr.length > 0;
};

export function isEmptyOrSpaces(str) {
  let EMPTY_REGEX = /^\s+$/;
  const Empty = EMPTY_REGEX.test(str);

  return str === null || str.match(/^ *$/) !== null || Empty;
}

export const countWords = str => {
  return str.trim().split(/\s+/).length;
};
