const Service = require('../models/servicesModel');

const createService = async (req, res) => {
    if (
        !req.body.title ||
        !req.body.description
    ) {
        return res.status(400).json({message: 'All fields are required!'});
    }

    try {
        const service = await Service.create({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image
        });
        res.status(201).json({message: 'Service created successfully', service});
    } catch (error) {
        res.status(500).json({message: "Service couldn't be created"});
    }
};

const getAllServices = async (req, res) => {
    try {
        const service = await Service.find().sort({$natural: -1});
        res.status(200).json({service});
    } catch (error) {
        res.status(500).json({message: "Service couldn't be fetched"});
    }
};
const getService = async (req, res) => {
    try {
        const service = await Service.find({_id: req.params.id});
        res.status(200).json({service});
    } catch (error) {
        res.status(500).json({message: "Service couldn't be fetched"});
    }
};

const deleteService = async (req, res) => {
    try {
        const service = await Service.find({_id: req.params.id});
        if (!service) {
            return res.status(404).json({message: 'Service not found'});
        }
        await Service.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Service deleted successfully'});
    } catch (error) {
        res.status(500).json({message: "Service couldn't be deleted"});
    }
};

const updateService = async (req, res) => {
    try{
        const service = await Service.find({_id: req.params.id});
        if (!service) {
            return res.status(404).json({message: 'Service not found'});
        }
        const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({message: 'Service updated successfully', updatedService});
    } catch (error) {
        res.status(500).json({message: "Service couldn't be updated"});
    }
};

module.exports = {
    createService,
    getAllServices,
    getService,
    deleteService,
    updateService
};