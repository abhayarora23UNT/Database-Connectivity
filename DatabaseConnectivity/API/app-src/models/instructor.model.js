'user strict';
var dbConn = require('../../app-config/db.config');

//Instructor object create
var Instructor = function (instructor) {
    this.ID = instructor.ID;
    this.dept_name = instructor.dept_name;
    this.name = instructor.name;
    this.salary = instructor.salary;

};
Instructor.create = function (newInstructor, resultCallback) {
    dbConn.query("INSERT INTO instructor set ?", newInstructor, function (error, response) {
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

Instructor.findById = function (id, resultCallback) {
    dbConn.query("Select * from instructor where ID = ? ", id, function (error, response) {
        if (error) {
            console.log("error: ", error);
            resultCallback(error, null);
        }
        else {
            resultCallback(null, response);
        }
    });
};

Instructor.findAll = function (resultCallback) {
    dbConn.query("Select * from instructor", function (error, response) {
        if (error) {
            console.log("error: ", error);
            resultCallback(null, error);
        }
        else {
            console.log('instructor : ', response);
            resultCallback(null, response);
        }
    });
};

Instructor.updateSalary = function (id, instructor, resultCallback) {
    dbConn.query("UPDATE instructor SET salary=? WHERE ID = ?", [instructor.salary, id], function (error, response) {
        if (error) {
            console.log("error: ", error);
            resultCallback(null, error);
        } else {
            resultCallback(null, response);
        }
    });
};

Instructor.deleteById = function (id, resultCallback) {
    dbConn.query("DELETE FROM instructor WHERE ID = ?", [id], function (error, response) {
        if (error) {
            console.log("error: ", error);
            resultCallback(null, error);
        }
        else {
            resultCallback(null, response);
        }
    });
};

module.exports = Instructor;