import { Tag } from "../types/tag";

export const splitTags = (str: string): Pick<Tag, "name">[] => {
  const arr = str.split(",");

  return arr.map((tag) => {
    return Object.assign({}, { name: tag });
  });
};
