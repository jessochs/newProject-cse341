const express = require('express');
const router = express.Router();

const projectController = require('../controllers/employee-projects');
const validation = require('../middleware/validate');
// validation needs to be added for new routes

router.get('/', projectController.getAll);
router.get('/:id', projectController.getSingle);
router.post('/', validation.saveProject, projectController.createProject);
router.put('/:id', validation.saveProject, projectController.updateProject);
router.delete('/:id', projectController.toDelete);

module.exports = router;