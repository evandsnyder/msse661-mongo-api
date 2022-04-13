const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');

const recipeRoutes = require('./routes/recipes.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const errorMiddleware = require('./middleware/errors.middleware');
const authMiddleware = require('./middleware/auth.middleware');

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

app.use(cors());

app.use(logger(logLevel));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/recipe', recipeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);


app.use(errorMiddleware.error404);
app.use(errorMiddleware.error500);
app.listen(port, errorMiddleware.logger(port));