const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const maxAge = process.env.MAX_AGE;

const createToken = (id,username) => {
    return jwt.sign({ id, }, process.env.SECRET_KEY, {
        expiresIn: maxAge
    });
};

module.exports.login_get = (req, res) => {
    res.render('/login');
};

module.exports.login_post = async (req, res) => {
    const {admissionNumber, password} = req.body;

    try{
        const user = await User.login(admissionNumber, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({user: user._id, username: user.username});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
};