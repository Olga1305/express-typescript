import express from 'express';
import config from './common/config';

const { NODE_ENV, PORT } = config;

import routes from './routes/routes';

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }
    next();
});

app.use('/', routes);

app.listen(PORT, () => {
    if (NODE_ENV === "development") {
        console.log(`App is running on http://localhost:${PORT}`)
    }
});
