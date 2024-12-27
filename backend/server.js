const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
console.log(process.env.NODE_ENV);
process.on('uncaughtException', (err) => {
    console.log(err);
    console.log('Shuting down');
    process.exit(1);
});
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then((con) => {
        console.log('DB Connected Successfully .....');
    });
const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`works on ${port} ...`);
});
process.on('unhandeledRejection', (err) => {
    console.log(err);
    console.log('Shuting down');
    server.close(() => {
        process.exit(1);
    });
});
process.on('uncaughtException', (err) => {
    console.log(err);
    console.log('Shuting down');
    server.close(() => {
        process.exit(1);
    });
});
