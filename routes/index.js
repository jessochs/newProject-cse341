const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/employees', require('./employees'));
router.use('/employee_projects', require('./employee-projects'));

module.exports = router;