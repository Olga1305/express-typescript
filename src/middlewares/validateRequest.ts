import { query, oneOf, param, validationResult } from 'express-validator';
import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const validateCountriesQueries = oneOf([
    query('filter').isString(),
    query('order').isString().isIn(['asc', 'desc'])]);

const validateStringParam = param('str').isString().notEmpty();

const validateStringQueries = oneOf([
    query('start').isString(),
    query('end').isString()]);

const validate = (req: Request, res: Response) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    if (hasErrors) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(ReasonPhrases.UNPROCESSABLE_ENTITY);
    }
}

export { validateCountriesQueries, validateStringParam, validateStringQueries, validate };