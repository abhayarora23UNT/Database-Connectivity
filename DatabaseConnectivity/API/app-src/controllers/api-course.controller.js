'use strict';

// #region 'CourseController' 
const Course = require('../models/course.model');

/**
 * Method to find all records
 * @param {*} request request object
 * @param {*} response response object
 */
exports.findAll = function(request, response) {
    Course.findAll(function(error, course) {
    console.log('course controller')
    if (error)
    // response.send(error);
    response.json({ status: false, message: error, data: null });
    console.log('response', course);
    // response.send(course);
    response.json({ status: true, message: '', data: course });
  });
};


/**
 * Method to find insert new record
 * @param {*} request request object
 * @param {*} response response object
 */
exports.create = function(request, response) {
    const new_Course = new Course(request.body);

    //handles null error 
   if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        response.status(400).send({ status:false, message: 'Please enter data for mandatory fields' });
    }else{
        Course.create(new_Course, function(error, course) {
            if (error)
            // response.send(error);
            response.json({ status: false, message: error, data: null });
            response.json({status:true,message:"Course inserted successfully!",data:course});
        });
    }
};


/**
 * Method to find record by CourseId
 * @param {*} request request object
 * @param {*} response response object
 */
exports.findByCourseId = function(request, response) {
    Course.findByCourseId(request.params.course_id, function(error, course) {
        if (error)
        // response.send(error);
        // response.json(course);

        response.json({ status: false, message: error, data: null });
        response.json({ status: true, message: "", data: course });
    });
};


/**
 * Method to update course credits
 * @param {*} request request object
 * @param {*} response response object
 */
exports.updateCredits = function(request, response) {
    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        response.status(400).send({ status:false, message: 'Please enter data for mandatory fields' });
    }else{
        Course.updateCredits(request.params.course_id, new Course(request.body), function(error, course) {
            if (error)
            // response.send(error);

            response.json({ status: false, message: error, data: null });
            response.json({ status:true, message: 'Course credits updated successfully',data:null });
        });
    }
  
};


/**
 * Method to delete course by CourseId
 * @param {*} request request object
 * @param {*} response response object
 */
exports.deleteByCourseId = function(request, response) {
  Course.deleteByCourseId( request.params.course_id, function(error, course) {
    if (error)
    // response.send(error);
    response.json({ status: false, message: error, data: null });
    response.json({ status:true, message: 'Course deleted successfully',data:null });
  });
};

// #endregion 'departmentController'