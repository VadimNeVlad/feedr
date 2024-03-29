import moment from "moment";

export const formatDate = (timestamp: Date, momented = true): string => {
  const date = new Date(timestamp).toLocaleDateString("en-us", {
    month: "short",
    day: "numeric",
    year: momented ? undefined : "numeric",
  });
  return momented
    ? `${date} (${moment(timestamp).startOf("seconds").fromNow()})`
    : date;
};
