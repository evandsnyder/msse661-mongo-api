const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');

const recipeRoutes = require('./routes/recipes.routes');
const middleware = require('./middleware/errors.middleware');

const app = express();
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || 'debug';

mongoose.Promise = global.Promise;
console.log(`connecting using: ${process.env.MONGO_URI}`);
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database Connection Successful');
});

app.use(logger(logLevel));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/recipe', recipeRoutes);
app.use(middleware.error404);
app.use(middleware.error500);
app.listen(port, middleware.logger(port));