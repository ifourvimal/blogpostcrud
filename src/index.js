const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const Locale = require('./core/errorMessageLocale');
const apiErrorBuilder = require('./core/apiErrorBuilder');
const articleRouter = require('./article/router');
const commentRouter = require('./comment/router');

require('dotenv').config();

process.on('unhandledRejection', (reason) => {
  console.log('!!!uncaughtException');
  console.log(reason);
  throw reason;
});

process.on('uncaughtException', (error) => {
  console.log(error);
  return process.exit(1);
});

const app = express();

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: process.env.MAX_BODY_SIZE }));
app.use((req, res, next) => {
  console.log(`--> ${req.method} ${req.url}`);
  return next();
});


const path = `/${process.env.REL_PATH}`;
app.get(path, (req, res) => res.send({ result: { status: 'ok' } }));
app.use(Locale.setLocale);
app.use(path, articleRouter);
app.use(path, commentRouter);

app.use((err, req, res, next) => {
  if (err.message && err.message === 'unauthorized') {
    res.status(401).end();
  } else {
    apiErrorBuilder.errorResponseHandler(err, res, next);
  }
});

sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    return process.exit(1);
});
