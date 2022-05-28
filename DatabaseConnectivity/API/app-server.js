const express = require('express');

const bodyParser = require('body-parser');

// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a root route
app.get('/', (req, res) => {
  res.send("API Connected");
});

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Require different Module routes
const departmentRoutes = require('./app-src/routes/department.routes')
const instructorRoutes = require('./app-src/routes/instructor.routes')
const coursesRoutes = require('./app-src/routes/course.routes')

// using as middleware
app.use('/api/v1/department', departmentRoutes)
app.use('/api/v1/instructor', instructorRoutes)
app.use('/api/v1/course', coursesRoutes)

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});