const Gallery = require('../models/galleryModel');

const createGallery = async (req, res) => {
    if (
        !req.body.title ||
        !req.body.description ||
        !req.body.image
    ) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const gallery = await Gallery.create({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
        });
        res.status(201).json({ message: 'Gallery created successfully', gallery });
    } catch (error) {
        res.status(500).json({ message: "Couldn't create Gallery" });
    }
};

const getAllGalleries = async (req, res) => {
    try {
        const gallery = await Gallery.find().sort({$natural:-1});
        if (gallery == undefined || gallery == null || gallery == '' || gallery == {} || gallery == []) {
            return res.status(404).json({ message: 'Gallery empty' })};
        res.status(200).json({ gallery });
    } catch (error) {
        res.status(500).json({ message: "Couldn't fetch Gallery" });
    }
};

const getGallery = async (req, res) => {
    try {
        const gallery = await Gallery.find({ _id: req.params.id });
        if (gallery == undefined || gallery == null || gallery == '' || gallery == {} || gallery == []) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.status(200).json({ gallery });
    } catch (error){
        res.status(500).json({ message: "Couldn't fetch specific Gallery. An error occured " });
    }
};

const deleteGallery = async (req, res) => {
    try{
        const gallery = await Gallery.find({ _id: req.params.id });
        if (!gallery) {
            return res.status(404).json({ message: 'Gallery not found' });
        }
        await Gallery.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ message: 'Gallery deleted successfully' });
    } catch (error){
        res.status(500).json({ message: "Couldn't delete Gallery" });
    }
};

const updateGallery = async (req, res) => {
    try {
        const gallery = await Gallery.find({ _id: req.params.id });
        if (!gallery) {
            return res.status(404).json({ message: 'Gallery not found' });
        }
        await Gallery.findByIdAndUpdate({ _id: req.params.id }, req.body);
        res.status(200).json({ message: 'Gallery updated successfully' });
    } catch (error) {
        res.status(500).json({ message: "Couldn't update Gallery" });
    }
};

module.exports = {
    createGallery,
    getAllGalleries,
    getGallery,
    deleteGallery,
    updateGallery,
};