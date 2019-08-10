const express = require('express');
const importController = require('../controllers/import');

const router = express.Router();

router.post('/import', importController.handleImport);

module.exports = router;
