const Testimonial = require('../models/testimonialsModel');

const createTestimonial = async (req, res) => {
    if (
        !req.body.name ||
        !req.body.description ||
        !req.body.testimonial ||
        !req.body.image
    ){
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const testimonial = await Testimonial.create({
            name: req.body.name,
            description: req.body.description,
            testimonial: req.body.testimonial,
            image: req.body.image,
            video: req.body.video
        });
        res.status(201).json({ message: 'Testimonial created successfully', testimonial });
    } catch (error) {
        res.status(500).json({ message: "Testimonial couldn't be created", error});
    }
};

const getAllTestimonials = async (req, res) => {
    try {
        const testimonial = await Testimonial.find().sort({$natural:-1});
        res.status(200).json({ testimonial });
    } catch (error) {
        res.status(500).json({ message: 'Unable to fetch testimonials' });
    }
};

const getTestimonials = async (req, res) => {
    try {
        const testimonial = await Testimonial.find({ _id: req.params.id });
        res.status(200).json({ testimonial });
    } catch (error) {
        res.status(500).json({ message: 'Unable to fetch specific testimonial' });
    }
};

const deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.find({ _id: req.params.id });
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        await Testimonial.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Unable to delete testimonial' });
    }
};

const updateTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.find({ _id: req.params.id });
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        const updatedTestimonial = await Testimonial.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(200).json({ message: 'Testimonial updated successfully', updatedTestimonial });
    } catch (error) {
        res.status(500).json({ message: 'Unable to update testimonial' });
    }
};

module.exports ={
    createTestimonial,
    getAllTestimonials,
    getTestimonials,
    deleteTestimonial,
    updateTestimonial,
};