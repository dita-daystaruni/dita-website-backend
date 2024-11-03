const Project = require('../models/projectModel');

const createProject = async (req, res) => {
    if (
        !req.body.title ||
        !req.body.description ||
        !req.body.author ||
        !req.body.category ||
        !req.body.image
    ) {
        return res.status(400).json({message: 'All fields are required'});
    }
    try {
        const project = await Project.create({
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            category: req.body.category,
            projectUrl: req.body.projectUrl,
            githubUrl: req.body.githubUrl,
            image: req.body.image,
        });
        return res.status(201).json({message: "Project created successfully", project});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({createdAt: -1});
        return res.status(200).json({projects});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            return res.status(200).json({project});
        }
        return res.status(404).json({message: 'Project not found'});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({message: 'Project not found'});
        }
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.status(200).json({message: 'Project updated successfully', updatedProject});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({message: 'Project not found'});
        }
        await Project.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: 'Project deleted successfully'});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};