export const splitTags = (str: string) => {
  const arr = str.split(",");

  return arr.map((tag) => {
    return Object.assign({}, { name: tag });
  });
};
