const mongoose = require('mongoose');
const testimonialSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        testimonial: {type: String, required: true},
        image: {type: String, required: true},
        video: {type: String, required: false}
    },
    {timestamps: true}
);

module.exports = mongoose.model('Testimonial', testimonialSchema);