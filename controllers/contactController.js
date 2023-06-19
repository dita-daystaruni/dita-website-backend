const Contact = require('../models/contactModel');

const createContact = async (req, res) => {
    if (
        !req.body.name ||
        !req.body.email
    ) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }
    try {
        const contact = await Contact.create({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            instagram: req.body.instagram,
            facebook: req.body.facebook,
            twitter: req.body.twitter,
            linkedIn: req.body.linkedIn,
        });
        res.status(201).json({ message : 'Contact created successfully', contact });
    } catch (error) {
        res.status(500).json({ message: "Couldn't create Contact" });
    }
};

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({$natural:-1});
        res.status(200).json({ contacts });
    } catch (error) {
        res.status(500).json({ message: "Couldn't fetch Contacts" });
    }
};

const getContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        res.status(200).json({ contact });
    } catch(error) {
        res.status(200).json({ message: "Couldn't fetch Contact" });
    }
}; 

const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        await Contact.findByIdAndDelete({_id: req.params.id});
        res.status(200).json({ message:"Contact deleted" });
    } catch(error) {
        res.status(500).json({ message: "Couldn't delete Contact" });
    }
};

const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Contact updated", updatedContact });
    } catch (error) {
        res.status(500).json({ message: "Couldn't update Contact" });
    }
};

module.exports = {
    createContact,
    getAllContacts,
    getContact,
    deleteContact,
    updateContact
};