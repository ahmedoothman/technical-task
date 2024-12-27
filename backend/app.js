const express = require('express');
const path = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const AppError = require('./utils/appError.js');
const app = express();
const userRouter = require('./routes/userRoutes');
const bookRouter = require('./routes/bookRoutes');
const { swaggerUi, swaggerSpec } = require('./swaggerDocs');

const errorController = require('./controllers/errorController');
//development logging
app.use(morgan('dev'));
//secuirty middlewares
const limiter = rateLimit({
    max: 200,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests drom this IP, please try again in an hour!',
});
app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(cors());
app.use(
    hpp({
        whitelist: [],
    })
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/books', bookRouter);
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorController);
module.exports = app;
