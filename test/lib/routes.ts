export default {
  countries: {
    getAll: '/countries',
    getFiltered: (filter: string): string => `/countries?filter=${filter}`,
    getOrdered: (order: string): string => `/countries?order=${order}`,
    getFilteredAndOrdered: (filter: string, order: string): string =>
      `/countries?filter=${filter}&order=${order}`,
  },
  reverse: {
    getReversedString: (str: string): string => `/reverse/${str}`
  },
  append: {
    appendToStart: (start: string): string => `/append?start=${start}`,
    appendToEnd: (end: string): string => `/append?end=${end}`,
    appendToStartAndToEnd: (start: string, end: string): string => `/append?start=${start}&end=${end}`,
  },
};
