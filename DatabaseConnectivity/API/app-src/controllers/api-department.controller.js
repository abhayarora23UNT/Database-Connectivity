'use strict';

// #region 'departmentController' 
const Department = require('../models/department.model');

/**
 * Method to find all records
 * @param {*} request request object
 * @param {*} response response object
 */
exports.findAll = function(request, response) {
  Department.findAll(function(err, department) {
    console.log('department controller')
    if (err)
    // response.send(err);
    response.json({status:false,message:err,data:null});
    console.log('response', department);
    // response.send(department);
    response.json({status:true,message:'',data:department});
  });
};


/**
 * Method to insert new record
 * @param {*} request request object
 * @param {*} response response object
 */
exports.create = function(request, response) {
    const new_department = new Department(request.body);

    //handles null error 
   if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        response.status(400).send({ status:false, message: 'Please enter data for mandatory fields',data:null });
    }else{
        Department.create(new_department, function(err, department) {
            if (err)
            // response.send(err);
            response.json({status:false,message:err,data:null});
            response.json({status:true,message:"New Department added successfully!",data:department});
        });
    }
};


/**
 * Method to find department record by Name
 * @param {*} request request object
 * @param {*} response response object
 */
exports.findByDepartment = function(request, response) {
    Department.findByDepartment(request.params.dept_name, function(err, department) {
        if (err)
        // response.send(err);
        // response.json(department);
        response.json({status:false,message:err,data:null});
        response.json({status:true,message:"",data:department});
    });
};


/**
 * Method to update department budget
 * @param {*} request request object
 * @param {*} response response object
 */
exports.updateBudget = function(request, response) {
    if(request.body.constructor === Object && Object.keys(request.body).length === 0){
        response.status(400).send({ status:false, message: 'Please enter data for mandatory fields' });
    }else{
        Department.updateBudget(request.params.dept_name, new Department(request.body), function(err, department) {
            if (err)
            // response.send(err);
            response.json({status:false,message:err,data:null});
            response.json({ status:true, message: 'Budget value updated successfully' ,data:null});
        });
    }
  
};


/**
 * Method to find delete record by Department Name
 * @param {*} request request object
 * @param {*} response response object
 */
exports.deleteByDepartmentName = function(request, response) {
  Department.deleteByDepartmentName( request.params.dept_name, function(err, department) {
    if (err)
   //  response.send(err);
    response.json({status:false,message:err,data:null});
    response.json({ status:true, message: request.params.dept_name+' Department deleted successfully',data:null });
  });
};

// #endregion 'departmentController'