const Event = require('../models/eventModel');


const createEvent = async (req, res) => {
    if (
        !req.body.title ||
        !req.body.description ||
        !req.body.date ||
        !req.body.location ||
        !req.body.image
    ) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const date = new Date(req.body.date).toDateString();


    try {
        const event = await Event.create({
            title: req.body.title,
            description: req.body.description,
            date: date,
            location: req.body.location,
            image: req.body.image,
            notes: req.body.notes,
        });
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getAllEvents = async (req, res) => {
        try {
            const event = await Event.find().sort({$natural:-1});
            res.status(200).json({ event });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
};

const getEvent = async (req, res) => {
    try {
        const event = await Event.find({ _id: req.params.id });
        res.status(200).json({ event });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.find({ _id: req.params.id });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        await Event.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateEvent = async (req, res) => {
    try {
        const event = await Event.find({ _id: req.params.id });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id,req.body, {new:true});
        res.status(200).json({ message: 'Event updated successfully', updatedEvent });
    } catch (error) {
        res.status(500).json({message: error.message }); // 500
    }
};


module.exports = {  
    createEvent,
    getAllEvents,
    getEvent,
    deleteEvent,
    updateEvent,
};