const express = require('express');

const {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
} = require('../controllers/projectController');

const router = express.Router();

router.post('/create', createProject);
router.get('/all', getAllProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

module.exports = router;