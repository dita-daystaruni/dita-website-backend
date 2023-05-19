const Event = require('../models/eventModel');

const createEvent = async (req, res) => {
    if (
        !req.body.title ||
        !req.body.description ||
        !req.body.date ||
        !req.body.location
    ) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const event = await Event.create({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            image: req.body.image,
        });
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

    const getAllEvents = async (req, res) => {
        try {
            const event = await Event.find().sort({$natural:-1});
            res.status(200).json({ event });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }
};

module.exports = {createEvent,  getAllEvents}