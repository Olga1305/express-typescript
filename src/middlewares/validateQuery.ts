import { query, oneOf } from 'express-validator';

const validateCountriesQueries = oneOf([
    query('filter').isString(),
    query('order').isString().isIn(['asc', 'desc'])]);

export default validateCountriesQueries;