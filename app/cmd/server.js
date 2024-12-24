import express from 'express';
import path from 'node:path'
import cors from 'cors'
import __dirname from '../pkg/utilities/dirname.js';
import { connectDb } from '../pkg/services/db/connectMongo.js';
import { addLogger, logger } from '../pkg/middleware/logger.js';
import handleResponses from '../pkg/middleware/handleResponses.js';
import initializePassport from '../modules/auth/config/passport.config.js';
import passport from 'passport';
import appRouter from '../modules/routes.js'
import handleErrors from '../pkg/middleware/handleErrors.js';
import dotenv from 'dotenv';
import corsOptions from '../config/corsConfig.js';

dotenv.config()

// App initialization ------------------------------
const app = express();
// en app mobile, cambiar "localhost" por la "IP"
app.use(cors(corsOptions));

// App Configurations --------------------------------
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

// App Data Source Configuration --------------------------------
connectDb()

// App Middleware --------------------------------
app.use(addLogger)
app.use(handleResponses)

// passport
initializePassport()
app.use(passport.initialize())

// App Routes --------------------------------
app.get('/', (req, res) => { res.send({ prueba: "Hello backend" }) });
app.use('/', appRouter);

// Error Handling Middleware --------------------------------
app.use(handleErrors)

// App Launch --------------------------------
app.listen(port, () => { logger.info(`Server running on port: ${port}`); });