const mongoose = require('mongoose');
const contactSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        phoneNumber: {type: String, required: false},
        instagram: {type: String, required: false},
        facebook: {type: String, required: false},
        twitter: {type: String, required: false},
        linkedIn: {type: String, required: false},
    },
    {timestamps: true}
);

module.exports = mongoose.model('Contact', contactSchema);