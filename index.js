const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');
const passportInit = require('./lib/passport.init');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, poolSize: 20 });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// Setup for passport and to accept JSON objects
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
passportInit();

app.set('io', io);

app.use('/api', apiRouter);
app.use('/auth', authRouter);

app.get('/wake-up', (req, res) => res.send('👍'));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

// Error Handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err);

  const errCode = err.status || 500;
  const errMessage = err.message || 'Internal Server Error';

  res.status(errCode).json({ error: errMessage });
});

const port = process.env.PORT || 5000;
server.listen(port);

console.log(`Server is listening on port ${port}`);
