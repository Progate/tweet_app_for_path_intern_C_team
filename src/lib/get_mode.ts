export const getMode = (): string => {
  return process.env.NODE_ENV || "development";
};
