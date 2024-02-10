const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/employees', require('./employees'));

module.exports = router;