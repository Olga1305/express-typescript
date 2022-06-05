import { Router, Request, Response, NextFunction } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';

import { validateCountriesQueries, validateStringParam, validateStringQueries } from '../middlewares/validateRequest';
import * as countriesService from '../services/countriesService';
import * as reverseStringService from '../services/reverseStringService';
import * as addStringService from '../services/addStringService';

const router = Router({ mergeParams: true });

router.get('/countries', validateCountriesQueries, async (req: Request, res: Response, next: NextFunction) => {
    const { filter, order } = req.query;
    try {
        if (filter || order) {
            const result = validationResult(req);
            const hasErrors = !result.isEmpty();
            if (hasErrors) {
                res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(ReasonPhrases.UNPROCESSABLE_ENTITY);
            }
        }
        const response = await countriesService.getCountries(filter as string, order as string);
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        next(error);
    }
});

router.get('/reverse/:str', validateStringParam, async (req: Request, res: Response, next: NextFunction) => {
    const { str } = req.params;
    try {
        const result = validationResult(req);
        const hasErrors = !result.isEmpty();
        if (hasErrors) {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(ReasonPhrases.UNPROCESSABLE_ENTITY);
        }
        const response = reverseStringService.getReversedString(str as string);
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        next(error);
    }
});

router.get('/append', validateStringQueries, async (req: Request, res: Response, next: NextFunction) => {
    const { start, end } = req.query;
    try {
        const result = validationResult(req);
        const hasErrors = !result.isEmpty();
        if (hasErrors) {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(ReasonPhrases.UNPROCESSABLE_ENTITY);
        }
        const response = addStringService.getModifiedArray(start as string, end as string);
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        next(error);
    }
});

export default router;