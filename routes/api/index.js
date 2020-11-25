const express = require('express');
const router = express.Router();

router.use('/open', require('./open'));
router.use('/auth', require('./auth'));
router.use('/admin', require('./admin'))

module.exports = router;

