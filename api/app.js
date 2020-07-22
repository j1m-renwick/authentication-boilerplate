import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import express from 'express';
import httpErrors from 'http-errors';
import logger from 'morgan';
import path from 'path';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import authRouter from './routes/auth';
import {v4 as uuid} from 'uuid';
import {findByUsername, findById} from './db/users';
import morgan from "morgan";
import chalk from 'chalk';


const app = express();
const SECRET_KEY = "mysecrethere"

// various parsing middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));

// middleware to log api request
app.use(logger('dev'));
app.use(morgan('combined'));
// log JSON request body
morgan.token('body', function (req, res) { return JSON.stringify(req.body, null, 2) });
app.use(morgan(function (tokens, req, res) {return chalk.bold.yellow("JSON REQUEST\n") + tokens.body(req, res)}))

// serve static public files for the api project (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// serve static files for the react build
app.use(express.static(path.join(__dirname, '../build')));

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use("local", new LocalStrategy({},
    function(username, password, cb) {
        findByUsername(username, function(err, user) {
            if(err) {
                return cb(err);
            }
            if(!user) {
                return cb(null, false);
            }
            if(user.password !== password) {
                return cb(null, false);
            }
            return cb(null, user);
        });
    }));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    findById(id, function(err, user) {
        if(err) {
            return cb(err);
        }
        cb(null, user);
    });
});

// middleware for user session cookie data
app.use(require('express-session')({
    genid: function(req) {
        return uuid() // use UUIDs for session IDs
    },
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);

// Define routes.

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.get('/ping', function(req, res) {
    res.send("PONG");
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json(err);
});

export default app;
