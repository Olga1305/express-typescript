import express, { Request, Response, NextFunction } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import config from './common/config';

const { NODE_ENV, PORT } = config;

import routes from './routes/routes';

const app = express();

app.use(express.json());

app.use('/', (req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }
    next();
});

app.use('/', routes);

// catch 404 for unexisting routes
app.use((_req, res) => {
    res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // always log the error
    console.error('ERROR', req.method, req.path, err);

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
    next();
});

app.listen(PORT, () => {
    if (NODE_ENV === "development") {
        console.log(`App is running on http://localhost:${PORT}`)
    }
});