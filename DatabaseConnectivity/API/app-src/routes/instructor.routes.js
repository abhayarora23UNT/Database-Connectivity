const express = require('express')
const router = express.Router()
const instructorController = require('../controllers/api-instructor.controller');

// Retrieve all instructor
router.get('/', instructorController.findAll);

// Create a new instructor
router.post('/', instructorController.create);

// Retrieve a single instructor with ID
router.get('/:ID', instructorController.findById);

// Update a instructor salary with ID
router.put('/:ID', instructorController.updateSalary);

// Delete a instructor with ID
router.delete('/:ID', instructorController.deleteById);

module.exports = router