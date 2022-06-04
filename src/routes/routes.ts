import { Router, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { validateCountriesQueries, validateStringParam } from '../middlewares/validateRequest';
import * as countriesService from '../services/countriesService';
import * as reverseStringService from '../services/reverseStringService';

const router = Router({ mergeParams: true });

router.get('/countries', validateCountriesQueries, async (req: Request, res: Response) => {
    const { filter, order } = req.query;
    try {
        const response = await countriesService.getCountries(filter as string, order as string);
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);;
    }
});

router.get('/reverse/:str', validateStringParam, async (req: Request, res: Response) => {
    const { str } = req.params;
    try {
        const response = reverseStringService.getReversedString(str as string);
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);;
    }
})

export default router;