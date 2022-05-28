'use strict';

// #region 'InstructorController' 
const Instructor = require('../models/instructor.model');

/**
 * Method to find all records
 * @param {*} request request object
 * @param {*} response response object
 */
exports.findAll = function (request, response) {
    Instructor.findAll(function (err, instructor) {
        console.log('instructor controller')
        if (err)
            // response.send(err);
            response.json({ status: false, message: err, data: null });
        console.log('response', instructor);
        // response.send(instructor);
        response.json({ status: true, message: '', data: instructor });
    });
};


/**
 * Method to insert record
 * @param {*} request request object
 * @param {*} response response object
 */
exports.create = function (request, response) {
    const new_Instructor = new Instructor(request.body);

    //handles null status 
    if (request.body.constructor === Object && Object.keys(request.body).length === 0) {
        response.status(400).send({ status: true, message: 'Please enter data for mandatory fields', data: null });
    } else {
        Instructor.create(new_Instructor, function (err, instrcutor) {
            if (err)
                // response.send(err);
                response.json({ status: false, message: err, data: null });
            response.json({ status: true, message: "Instructor added successfully!", data: instrcutor });
        });
    }
};


/**
 * Method to find instructor by Id
 * @param {*} request request object
 * @param {*} response response object
 */
exports.findById = function (request, response) {
    Instructor.findById(request.params.ID, function (err, instructor) {
        if (err)
            // response.send(err);
            // response.json(instructor);
            response.json({ status: false, message: err, data: null });
        response.json({ status: true, message: "", data: instructor });
    });
};


/**
 * Method to update instructor salary
 * @param {*} request request object
 * @param {*} response response object
 */
exports.updateSalary = function (request, response) {
    if (request.body.constructor === Object && Object.keys(request.body).length === 0) {
        response.status(400).send({ status: false, message: 'Please enter data for mandatory fields' });
    } else {
        Instructor.updateSalary(request.params.ID, new Instructor(request.body), function (err, instructor) {
            if (err)
                // response.send(err);
                response.json({ status: false, message: err, data: null });
            response.json({ status: true, message: 'Instructor salary updated successfully', data: null });
        });
    }

};


/**
 * Method to delete instructor by instructor Id
 * @param {*} request request object
 * @param {*} response response object
 */
exports.deleteById = function (request, response) {
    Instructor.deleteById(request.params.ID, function (err, instructor) {
        if (err)
            // response.send(err);
            response.json({ status: false, message: err, data: null });
        response.json({ status: true, message: 'Instructor deleted successfully', data: null });
    });
};

// #endregion 'instructorController'