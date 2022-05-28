'user strict';
var dbConn = require('../../app-config/db.config');

//Course object create
var Course = function (course) {
    this.course_id = course.course_id;
    this.title = course.title;
    this.dept_name = course.dept_name;
    this.credits = course.credits;

};

Course.create = function (newCourse, resultCallback) {
    dbConn.query("INSERT INTO course set ?", newCourse, function (error, response) {
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

Course.findByCourseId = function (course_id, resultCallback) {
    dbConn.query("Select * from course where course_id = ? ", course_id, function (error, response) {
        if (error) {
            console.log("error: ", error);
            resultCallback(error, null);
        }
        else {
            resultCallback(null, response);
        }
    });
};

Course.findAll = function (resultCallback) {
    dbConn.query("Select * from course", function (error, response) {
        if (error) {
            console.log("error: ", error);
            resultCallback(null, error);
        }
        else {
            console.log('course : ', response);
            resultCallback(null, response);
        }
    });
};

Course.updateCredits = function (course_id, course, resultCallback) {
    dbConn.query("UPDATE course SET credits=? WHERE course_id = ?", [course.credits, course_id], function (error, response) {
        if (error) {
            console.log("error: ", error);
            resultCallback(null, error);
        } else {
            resultCallback(null, response);
        }
    });
};

Course.deleteByCourseId = function (course_id, resultCallback) {
    dbConn.query("DELETE FROM course WHERE course_id = ?", [course_id], function (error, response) {
        if (error) {
            console.log("error: ", error);
            resultCallback(null, error);
        }
        else {
            resultCallback(null, response);
        }
    });
};

module.exports = Course;