const Statement = require('../models/statementsModel');

const createStatement = async (req, res) => {
    if (
        !req.body.title ||
        !req.body.body 
    ) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const statement = await Statement.create({
            title: req.body.title,
            body: req.body.body,
        });
        res.status(201).json({ message: 'Statement created successfully', statement });
    } catch (error) {
        res.status(500).json({ message: "Statement couldn't be created" });
    }
};

const getAllStatements = async (req, res) => {
        try {
            const statement = await Statement.find().sort({$natural:-1});
            res.status(200).json({ statement });
        } catch (error) {
            res.status(500).json({ message: "Couldn't fetch Statement" });
        }
};

const getStatement = async (req, res) => {
    try {
        const statement = await Statement.find({ _id: req.params.id });
        if (statement == "") {
            return res.status(404).json({ message: 'No such statement' });
        }
        res.status(200).json({ statement });
    } catch (error) {
        res.status(500).json({ message: "Couldn't find statement" });
    }
};

const deleteStatement = async (req, res) => {
    try {
        const statement = await Statement.find({ _id: req.params.id });
        if (!statement) {
            return res.status(404).json({ message: 'Statement not found' });
        }
        await Statement.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ message: 'Statement deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Couldn't delete statement" });
    }
};

const updateStatement = async (req, res) => {
    try {
        const statement = await Statement.find({_id: req.params.id});
        if (!statement) {
            return res.status(404).json({ message: 'Statement not found' });
        }
        await Statement.findByIdAndUpdate({_id: req.params.id}, req.body);
        res.status(200).json({ message: 'Statement updated successfully' });
    } catch (error) {
        res.status(500).json({ message: "Couldn't update statement" });
    }
};

module.exports = {
    createStatement,
    getAllStatements,
    getStatement,
    deleteStatement,
    updateStatement,
};