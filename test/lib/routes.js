module.exports = {
  countries: {
    getAll: '/countries',
    getFiltered: (str) => `/countries?filter=${str}`,
    getOrdered: (str) => `/countries?order=${str}`,
    getFilteredAndOrdered: (str1, str2) =>
      `/countries?filter=${str1}&order=${str2}`,
  },
  reverse: (str) => `/reverse/${str}`,
  append: '/append',
};
