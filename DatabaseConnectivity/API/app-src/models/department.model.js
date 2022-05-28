'user strict';
var dbConn = require('../../app-config/db.config');

//Department object create
var Department = function (department) {
    this.dept_name = department.dept_name;
    this.building = department.building;
    this.budget = department.budget;

};

Department.create = function (newDept, resultCallback) {
    dbConn.query("INSERT INTO department set ?", newDept, function (error, response) {
        if (error) {
            console.log("error: ", error);
            resultCallback(error, null);
        }
        else {
            console.log(response.insertId);
            resultCallback(null, response.insertId);
        }
    });
};

Department.findByDepartment = function (dept_name, resultCallback) {
    dbConn.query("Select * from department where dept_name = ? ", dept_name, function (error, response) {
        if (error) {
            console.log("error: ", error);
            resultCallback(error, null);
        }
        else {
            resultCallback(null, response);
        }
    });
};

Department.findAll = function (resultCallback) {
    dbConn.query("Select * from department", function (error, response) {
        if (error) {
            console.log("error: ", error);
            resultCallback(null, error);
        }
        else {
            console.log('department : ', response);
            resultCallback(null, response);
        }
    });
};

Department.updateBudget = function (dept_name, department, resultCallback) {
    dbConn.query("UPDATE department SET budget=? WHERE dept_name = ?", [department.budget, dept_name], function (error, response) {
        if (error) {
            console.log("error: ", error);
            resultCallback(null, error);
        } else {
            resultCallback(null, response);
        }
    });
};

Department.deleteByDepartmentName = function (dept_name, resultCallback) {
    dbConn.query("DELETE FROM department WHERE dept_name = ?", [dept_name], function (error, response) {
        if (error) {
            console.log("error: ", error);
            resultCallback(null, error);
        }
        else {
            resultCallback(null, response);
        }
    });
};

module.exports = Department;