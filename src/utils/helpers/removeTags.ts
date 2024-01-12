export const removeTags = (str: string): string => {
  const regex = /(<([^>]+)>)/gi;
  return str.replace(regex, "");
};
