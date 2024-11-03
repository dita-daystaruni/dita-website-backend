const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema(
    {
        username: {type: String, required: true},
        admissionNumber: {type: String, unique:[true, "Admission Number already created"], required: true},
        password: {type: String, required: true},
    },
    {timestamps: true}
);

userSchema.statics.login = async function(admissionNumber, password) {
    const user = await this.findOne({ admissionNumber: admissionNumber});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect Password');
    }
    throw Error('Incorrect Admission Number');
};

const User = mongoose.model('User', userSchema);
module.exports = User;