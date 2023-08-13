export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = digits(date.getMonth() + 1, 2);
  const day = digits(date.getDate(), 2);
  const hour = digits(date.getHours(), 2);
  const minute = digits(date.getMinutes(), 2);
  return `${year}/${month}/${day} ${hour}:${minute}`;
};

const digits = (num: number, length: number): string => {
  return `${num}`.padStart(length, "0");
};
