module.exports = {
  countries: {
    getAll: '/countries',
    getFiltered: (filter) => `/countries?filter=${filter}`,
    getOrdered: (order) => `/countries?order=${order}`,
    getFilteredAndOrdered: (filter, order) =>
      `/countries?filter=${filter}&order=${order}`,
  },
  reverse: (str) => `/reverse/${str}`,
  append: {
    appendToStart: (start) => `/append?start=${start}`,
    appendToEnd: (end) => `/append?end=${end}`,
    appendToStartAndToEnd: (start, end) => `/append?start=${start}&end=${end}`,
  },
};
