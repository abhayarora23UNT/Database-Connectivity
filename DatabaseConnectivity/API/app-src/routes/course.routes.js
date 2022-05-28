const express = require('express')
const router = express.Router()
const coursesController = require('../controllers/api-course.controller');

// Retrieve all courses
router.get('/', coursesController.findAll);

// Create a new course
router.post('/', coursesController.create);

// Retrieve a single course with course_id
router.get('/:course_id', coursesController.findByCourseId);

// Update a course credits  with course_id
router.put('/:course_id', coursesController.updateCredits);

// Delete a course with course_id
router.delete('/:course_id', coursesController.deleteByCourseId);

module.exports = router