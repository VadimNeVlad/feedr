export const route = {
  initial: {
    opacity: 0,
    y: 10,
  },
  shown: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.06,
      type: "anticipate",
    },
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: {
      duration: 0.06,
      type: "anticipate",
    },
  },
};
