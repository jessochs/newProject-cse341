const express = require('express');

const router = express.Router();

const employeesController = require('../controllers/employees');
const validation = require('../middleware/validate');
const { requiresAuth } = require('express-openid-connect');

router.get('/', requiresAuth(), employeesController.getAll);

router.get('/:id', employeesController.getSingle);

router.post('/', requiresAuth(), validation.saveEmployee, employeesController.createEmployee);
router.put('/:id', validation.saveEmployee, employeesController.updateEmployee);
router.delete('/:id', employeesController.toDelete);

module.exports = router;