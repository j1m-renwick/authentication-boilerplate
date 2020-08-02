import {Router} from 'express';
import passport from 'passport';
import redis from 'redis';
import {v4 as uuid} from 'uuid';
import isHttpsServer from "../bin/start";

const REDIS_URL = "redis://127.0.0.1:8012"
const TOKEN_EXPIRY_SECS = 60 * 5;

// docker run --name express-redis-p 8012:6379 -d redis
// or
// docker container start express-redis
const redisClient = redis.createClient(REDIS_URL);

const router = Router();

router.post('/login', (req, res) => {

    // authenticate with db
    passport.authenticate('local', {}, (err, user) => {
        if(err || !user) {
            // return unauthorised status if authentication fails
            res.status(403);
            res.json()
        } else {
            // generate token
            let token = uuid();
            // save to redis with expiry
            redisClient.set(req.body.username, token, "EX", TOKEN_EXPIRY_SECS, (err, response) => {
                if(response === "OK") {
                    res.status(200);
                    let expiryDate = new Date();
                    expiryDate.setSeconds(expiryDate.getSeconds() + TOKEN_EXPIRY_SECS);
                    // TODO make sure cookie is marked as secure before deploying!
                    let cookieOptions =  {maxAge: TOKEN_EXPIRY_SECS * 1000, httpOnly: true};
                    if (isHttpsServer) {
                        cookieOptions.secure = true;
                    }
                    console.log("HERE");
                    res.cookie('session-token',token, cookieOptions);
                    //  TODO shouldn't expose the token in the response body (unless debugging?)
                    res.json({
                        "username": req.body.username,
                        "token": token,
                        "expires": expiryDate.toISOString()
                    })
                } else {
                    res.status(500);
                    res.json({"error": "redis cannot process request."})
                }
            })
        }
    })(req, res);
});

router.get('/validate', function(req, res) {
    if (req.cookies['session-token']) {
        console.log("COOKIE FOUND!")
        redisClient.get(req.query.username, (err, response) => {
            if(response === req.cookies['session-token']) {
                res.status(200);
            }
        })
    } else  {
        console.log("COOKIE NOT FOUND...")
        res.status(400);
    }
    res.json();
});

// router.get('/logout', function(req, res) {
//     redisClient.del()
//     req.logout();
//     res.redirect('/');
// });
//
// app.get('/profile',
//     require('connect-ensure-login').ensureLoggedIn(),
//     function(req, res){
//         res.render('profile', { user: req.user });
//     });

export default router;