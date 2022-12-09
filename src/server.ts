import express from 'express';
import http from 'http';
import mongoose, { mongo } from 'mongoose';
import { config } from './config/config';
import Logging from './library/logging';
import authorRoutes from './routes/Author.routes';

const router = express();

// connet to Mongoose
mongoose.set('strictQuery', true);
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('connected to mongoDB');
        startServer();
    })
    .catch((error) => {
        Logging.error('Unable to Connecct...');
        Logging.error(error);
    });

// Only start the server if mongoose connects

const startServer = () => {
    router.use((req, res, next) => {
        //log the request
        Logging.info(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] `);

        res.on('finish', () => {
            //log the response
            Logging.info(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}] `);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    //Routes
    router.use('/authors', authorRoutes);

    //HealthChecking
    router.get('/HealthCheck', (req, res, next) => res.status(200).json({ message: 'Working Great' }));

    //ErrorHandling
    router.use((req, res, next) => {
        const error = new Error('Not Found');
        Logging.error(error);
        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is perfectly running on port ${config.server.port}`));
};
