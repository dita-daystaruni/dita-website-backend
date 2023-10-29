const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const createUser = async (req, res) => {

    const { username, password, admissionNumber} = req.body;

    if (
        !username || !password || !admissionNumber
    ) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            password: hashedPassword,
            admissionNumber,
        });
        res.status(201).json({ message: 'User created successfully', user:{name: user.userName, adm: user.admissionNumber} });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { admissionNumber, password } = req.body;
    const maxAge = process.env.MAX_AGE;
    if (
        !admissionNumber || !password
    ) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const user = await User.find({ admissionNumber });
        //compare passwords
        const validPassword = await bcrypt.compare(password, user[0].password);

        if (user && validPassword) {
            const token = jwt.sign({ id: user._id, adm: user.admissionNumber, userName: user.username }, process.env.JWT_SECRET, {
                expiresIn: maxAge
            })
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).json({ userID: user[0]._id, username: user[0].username, token:token });
        }
        else {
            res.status(400).json({ message: 'Invalid Credentials' });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ $natural: -1 });
        function userList(users) {
            return users.map((user) => {
                return {
                    id: user._id,
                    username: user.username,
                    admissionNumber: user.admissionNumber,
                    createdAt: user.createdAt,
                };
            });
        }
        res.status(200).json(userList(users));
    } catch (error) {
        res.status(500).json({ message: "Couldn't fetch users" });
    }
};

const deleteUser = async (req, res) => {

    try {
        const users = await User.find({ _id: req.params.id });
        if (users == null || users == []) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updatedUser = await User.findByIdAndDelete({ _id: req.params.id });
        if (updatedUser == null || updatedUser == []) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const users = await User.find({ _id: req.params.id });
        if (!users) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, });

        function userList(updatedUser) {
            {
                return {
                    id: updatedUser._id,
                    username: updatedUser.username,
                    admissionNumber: updatedUser.admissionNumber,
                    createdAt: updatedUser.createdAt,
                };
            }
        };
        res.status(200).json(userList(updatedUser));
    } catch (error) {
        res.status(500).json({ message: "Couldn't update user" });
    }
};

module.exports = { loginUser, createUser, getAllUsers, deleteUser, updateUser };