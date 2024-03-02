const express = require('express');
const router = express.Router();

const projectController = require('../controllers/employee-projects');
const validation = require('../middleware/validate');
const { requiresAuth } = require('express-openid-connect');
// validation needs to be added for new routes

router.get('/', requiresAuth(), projectController.getAllProjects);
router.get('/:id', projectController.getSingleProject);
router.post('/', requiresAuth(), validation.saveProject, projectController.createProject);
router.put('/:id', validation.saveProject, projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
