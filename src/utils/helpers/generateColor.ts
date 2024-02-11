import tinycolor from "tinycolor2";

export const generateColor = (str: string): string => {
  const hash = str
    .split("")
    .reduce((acc, char) => char.charCodeAt(0) + (acc << 5) - acc, 0);
  const color = tinycolor({ h: hash % 360, s: 50, l: 50 }).toHexString();
  return color;
};
