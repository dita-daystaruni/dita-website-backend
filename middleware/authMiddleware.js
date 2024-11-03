const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = (req, res, next) => {
/*     const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.send("You are not authorized to view this page.");
                console.log(decodedToken);
                next();
            }
        });
    }
    else{
        res.send("You are not authorized to view this page.");
    } */

    
    res.send("Welcome to the admin page");
    next();
};

const checkUser = (req, res, next) => {
/*     const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                requireAuth(req, res, next);
            }
            else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } */
    res.send("Welcome to the admin page");
    next();
};


module.exports = { requireAuth, checkUser };