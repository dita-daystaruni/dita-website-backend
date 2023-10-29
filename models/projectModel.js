const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    author: {type: String, required: true},
    category: {type: String, required: true},
    projectUrl:{type:String, required:true},
    githubUrl:{type:String, required: true},
    image: {type: String, required: true},
},
{timestamps: true});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;