import { Router, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import validateCountriesQueries from '../middlewares/validateQuery';
import * as countriesService from '../services/countriesService';

const router = Router({ mergeParams: true });

router.get('/countries', validateCountriesQueries, async (req: Request, res: Response) => {
    const { filter, order } = req.query;
    try {
        const response = await countriesService.getCountries(filter as string, order as string)
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);;
    }
})

export default router;