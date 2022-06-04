import { query, oneOf, param } from 'express-validator';

const validateCountriesQueries = oneOf([
    query('filter').isString(),
    query('order').isString().isIn(['asc', 'desc'])]);

const validateStringParam = param(':str').isString().notEmpty();

export { validateCountriesQueries, validateStringParam };