const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        description : {type: String, required: true} ,
        date: {type: String, required: true},
        location: {type: String, required: true},
        image:{type: String, required: false},
        notes:{type: String, required: false}
    },
        {timestamps: true}
);

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
