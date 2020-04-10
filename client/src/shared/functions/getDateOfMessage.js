export const getDateOfMessage = (date) => {
  const newDate = new Date(date);
  const localeTime = newDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const localeDate = newDate.toLocaleDateString([], {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return `${localeTime} ${localeDate}`;
};
