const Leader = require('../models/leadershipModel');

const createLeader = async (req, res) => {
    if (
        !req.body.name ||
        !req.body.position ||
        !req.body.bio ||
        !req.body.tenure ||
        !req.body.image
    ) {
        return res.status(400).json({message: 'All fields are required!'});
    }

    try {
        const leader = await Leader.create({
            name: req.body.name,
            position: req.body.position,
            bio: req.body.bio,
            tenure: req.body.tenure,
            image: req.body.image
        });
        res.status(201).json({message: 'Leader created successfully', leader});
    } catch (error) {
        res.status(500).json({message: "Leader couldn't be created"});
    }
};

const getAllLeaders = async (req, res) => {
    try {
        const leader = await Leader.find().sort({$natural: -1});
        res.status(200).json({leader});
    } catch (error) {
        res.status(500).json({message: "Leader couldn't be fetched"});
    }
};

const getLeader = async (req, res) => {
    try {
        const leader = await Leader.find({_id: req.params.id});
        res.status(200).json({leader});
    } catch (error) {
        res.status(500).json({message: "Leader couldn't be fetched"});
    }
};

const updateLeader = async (req, res) => {
    try {
        const leader = await Leader.find({_id: req.params.id});
        if (!leader) {
            return res.status(404).json({message: 'Leader not found'});
        }
        const updatedLeader = await Leader.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({message: 'Leader updated successfully', updatedLeader});
    } catch (error) {}
};

const deleteLeader = async (req, res) => {
    try {
        const leader = await Leader.find({_id: req.params.id});
        if (!leader) {
            return res.status(404).json({message: 'Leader not found'});
        }
        await Leader.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Leader deleted successfully'});
    } catch (error) {
        res.status(500).json({message: "Leader couldn't be deleted"});
    }
};

module.exports = {
    createLeader,
    getAllLeaders,
    getLeader,
    updateLeader,
    deleteLeader
};