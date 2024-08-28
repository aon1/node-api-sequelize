const express = require('express');
const rTracer = require('cls-rtracer');

const logger = require('./logger');

const app = express();

app.use(rTracer.expressMiddleware());

const router = require('./app/router/');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', router);

app.use((err, req, res, next) => {
  if (err.isBoom) {
    return res.status(err.output.statusCode).json(err.output.payload);
  }
});

app.listen(3000, () => {
  logger.info('Node server listening on port 3000');
});
