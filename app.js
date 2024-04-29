const express = require('express');
const app = express();
app.use(express.json());

app.get('/server/status', (req, res, next) => {
  res.status(200).json({
    status: 'Server status is ok!',
  });
});

app.get('/api/users', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'api ok',
    metadata: [
      {
        name: 'Dat Tu',
        age: 30,
      },
      {
        name: 'Thien Tu',
        age: 12,
      },
    ],
  });
});

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: error.message || 'Internal Server Error',
  });
});

module.exports = app;
