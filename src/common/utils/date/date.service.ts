const getDateTimeString = (date: Date) => {
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const getDateString = (date: Date) => {
  return `${date.toLocaleDateString()}`;
};

const getTimeString = (date: Date) => {
  return `${date.toLocaleTimeString()}`;
};

const dateService = {
  getDateTimeString,
  getDateString,
  getTimeString,
};

export default dateService;
