import express from 'express';
const redis = require('redis');
const cors = require('cors');
import bodyParser from 'body-parser';
const test = false;
const app = express();
const port = 3000;

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;

const Client = redis.createClient({ socket: { host: redisHost, port: redisPort } });
Client.connect();

Client.on('error', (err: Error) => {
    console.log('Error ' + err);
});

Client.on('connect', () => {
    console.log('Redis connected');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use( bodyParser.text() );
app.use(cors());

app.use('/', require('./src/routes'));
if (!test) {
app.listen(port, () => {
    console.log( `server running on port ${port}` );})};

module.exports = { Client, app };
export default Client;