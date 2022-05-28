const express = require('express')
const router = express.Router()
const departmentController = require('../controllers/api-department.controller');

// Retrieve all departments
router.get('/', departmentController.findAll);

// Create a new department
router.post('/', departmentController.create);

// Retrieve a single department with deptName
router.get('/:dept_name', departmentController.findByDepartment);

// Update a department budget with deptName
router.put('/:dept_name', departmentController.updateBudget);

// Delete a department with deptName
router.delete('/:dept_name', departmentController.deleteByDepartmentName);

module.exports = router