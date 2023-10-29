const User = require('../models/userModel');
const bcrypt = require('bcrypt');


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
        user.password = undefined;
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { admissionNumber, password } = req.body;

    if (
        !admissionNumber || !password
    ) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const user = await User.findOne({ admissionNumber: admissionNumber });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).json({ user: user._id, username: user.username });
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