const express = require('express');
const router = express.Router();

// Controller import
const formController = require('../../controller/api/formController');

// --- Routes ---

// 1. Show the input page
router.get('/sentiment', formController.getForm);

// 2. Handle form submission & save data
router.post('/sentiment', formController.analyzeText);

module.exports = router;