import {Router} from 'express';
import passport from 'passport';

const router = Router();

router.post('/login', (req, res) => {
    console.log(req.body);
    passport.authenticate('local', {}, (err, user) => {
        if(err || !user) {
            res.status(403);
        } else {
            res.status(200);
        }
        res.json()
    })(req, res);
});

// app.get('/logout',
//     function(req, res){
//         req.logout();
//         res.redirect('/');
//     });
//
// app.get('/profile',
//     require('connect-ensure-login').ensureLoggedIn(),
//     function(req, res){
//         res.render('profile', { user: req.user });
//     });

export default router;