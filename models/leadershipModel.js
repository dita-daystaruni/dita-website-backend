const mongoose = require('mongoose');
const leadershipSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        position: {type: String, required: true},
        tenure: {type: String, required: true},
        bio: {type: String, required: true},
        image: {type: String, required: true}
    },
    {timestamps: true}
);

module.exports = mongoose.model('Leadership', leadershipSchema);