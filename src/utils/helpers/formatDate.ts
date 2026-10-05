export const formatDate = (
  timestamp: string | Date,
  relative = true,
): string => {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "Unknown date";
  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: relative ? undefined : "numeric",
  });
  if (!relative) return formatted;
  const seconds = (date.getTime() - Date.now()) / 1000;
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1],
  ];
  const [unit, divisor] =
    units.find(([, value]) => Math.abs(seconds) >= value) ??
    units[units.length - 1];
  return (
    formatted +
    " (" +
    new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
      Math.round(seconds / divisor),
      unit,
    ) +
    ")"
  );
};
