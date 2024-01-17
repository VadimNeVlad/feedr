import { useCallback, useState } from "react";

export const useToggle = (initialState = false): [boolean, () => void] => {
  const [value, setValue] = useState(initialState);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle];
};
