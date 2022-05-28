'use strict';
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
  host     : 'localhost',         // user host //
  user     : 'root',              // root user or any other user //
  password : '12345',             // password which we set in mysql //
  database : 'universityLabTest',  // database name , where we run university sql scripts files (DDL (3)) and smallRelationsInsertFile // 
  // user can use different database name //
  supportBigNumbers: true,
  bigNumberStrings: true
});
dbConn.connect(function(error) {
  if (error) throw error;
  console.log("Database Connected!");
});
module.exports = dbConn;