export const replaceTags = (text: string) => {
  const regex = /(<([^>]+)>)/gi;
  let result = text.replaceAll(regex, '');
  result = result.replaceAll('&nbsp;', ' ').replaceAll('&laquo;', ' ');
  return result;
};
