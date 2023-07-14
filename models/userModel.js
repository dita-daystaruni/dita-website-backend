const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        username: {type: String, required: true},
        admissionNumber: {type: String, unique:[true, "Admission Number already created"], required: true},
        password: {type: String, required: true, select: false},
    },
    {timestamps: true}
);

const User = mongoose.model('User', userSchema);

module.exports = User;