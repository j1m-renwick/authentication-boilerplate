import {Router} from 'express';
import passport from 'passport';
import redis from 'redis';
import {v4 as uuid} from 'uuid';
import isHttpsServer from "../bin/start";
import {ApiError, ErrorType} from "../errors/auth-errors";

const TOKEN_COOKIE_NAME = 'session-token';
const REDIS_URL = "redis://127.0.0.1:8012"
const TOKEN_EXPIRY_SECS = 60 * 5;

// docker run --name express-redis-p 8012:6379 -d redis
// or
// docker container start express-redis
const redisClient = redis.createClient(REDIS_URL);

const router = Router();

const okJson = res => {
    return res.status(200).json({"response": "ok"});
}

router.post('/login', (req, res, next) => {
    // authenticate with db
    passport.authenticate('local', {}, (err, user) => {
        if(err || !user) {
            next(ApiError(ErrorType.INCORRECT_CREDENTIALS));
        } else {
            // generate token
            let token = uuid();
            // save to redis with expiry
            redisClient.set(req.body.username, token, "EX", TOKEN_EXPIRY_SECS, (err, response) => {
                if(response === "OK") {
                    let expiryDate = new Date();
                    expiryDate.setSeconds(expiryDate.getSeconds() + TOKEN_EXPIRY_SECS);
                    let cookieOptions = {maxAge: TOKEN_EXPIRY_SECS * 1000, httpOnly: true};
                    if(isHttpsServer) {
                        cookieOptions.secure = true;
                    }
                    res.cookie(TOKEN_COOKIE_NAME, token, cookieOptions);
                    //  TODO remove the token from the response body?
                    res.status(200);
                    res.json({
                        "username": req.body.username,
                        "token": token,
                        "expires": expiryDate.toISOString()
                    })
                } else {
                    next(ApiError(ErrorType.INCORRECT_CREDENTIALS));
                }
            })
        }
    })(req, res);
});

router.get('/validate', (req, res, next) => {
    if(!req.query.username) {
        next(ApiError(ErrorType.NO_USERNAME_SUPPLIED));
    } else if(req.cookies[TOKEN_COOKIE_NAME]) {
        redisClient.get(req.query.username, (err, response) => {
            if(!err && response === req.cookies[TOKEN_COOKIE_NAME]) {
                okJson(res);
            } else {
                next(ApiError(ErrorType.TOKEN_NOT_VALID));
            }
        })
    } else {
        next(ApiError(ErrorType.TOKEN_NOT_VALID));
    }
});

router.get('/logout', (req, res, next) => {
    if(!req.query.username) {
        next(ApiError(ErrorType.NO_USERNAME_SUPPLIED));
    }
    redisClient.del(req.query.username, (err, response) => {
        if(!err) {
            // set the token cookie to a date in the past, so it expires immediately
            let expiryDate = new Date(1990, 1, 1);
            let cookieOptions = {expires: expiryDate, maxAge: 0, httpOnly: true};
            if(isHttpsServer) {
                cookieOptions.secure = true;
            }
            res.cookie(TOKEN_COOKIE_NAME, null, cookieOptions);
            okJson(res);
        } else {
            next(ApiError(ErrorType.REQUEST_PROCESS_FAIL));
        }
    });
});

//
// app.get('/profile',
//     require('connect-ensure-login').ensureLoggedIn(),
//     function(req, res){
//         res.render('profile', { user: req.user });
//     });

export default router;