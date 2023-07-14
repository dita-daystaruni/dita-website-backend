const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
        username: {type: String, required: true},
        admissionNumber: {type: String, unique:[true,"Admission Number alreadey used"], required: true},
        password: {type: String, required: true},
    },
    {timestamps: true}
);

module.exports = mongoose.model('User', userSchema);