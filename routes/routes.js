var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var projects = new (require('./rest-service'))('projects');
var employees = new (require('./rest-service'))('employees');
var services = new (require('./rest-service'))('stories');
var tasks = new (require('./rest-service'))('tasks');
var bugs = new (require('./rest-service'))('bugs');
var emp_pwds = require('../dataaccess/da_employee-passwords.js');
var da_employees = require('../dataaccess/da_employees');

// Enabling CORS
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

router.post('/authenticate', function (req, res, next) {
  var user = {
    email: req.body.email,
    password: req.body.password,
  };

  if (!emp_pwds.checkIfExists(user.email)) {
    res.json({
      success: false,
      message: 'Authentication failed, User not Found.'
    });
  } else if (!emp_pwds.validateUser(user.email, user.password)) {
    res.json({
      success: false,
      message: 'Authentication failed, Wrong Password.'
    });
  } else {
    var token = jwt.sign(user, "checking", {
      expiresIn: 1440
    });
    let emp = emp_pwds.getUser(user.email);
    let empName = "";
    let empProject = "";
    da_employees.getSingle({ params: { id: emp.id } }, undefined, function (empData) {
      empName = empData[0].name;
      empProject = empData[0].projectId;
    });
    res.json({
      success: true,
      message: 'Authentication Success.',
      token: token,
      id: emp.id,
      role: emp.role,
      name: empName,
      project: empProject
    });
  }
});
router.use('/projects', projects);
router.use('/employees', employees);
router.use('/stories', services);
router.use('/stories/:storyId/tasks', tasks);
router.use('/tasks/:taskId/bugs', bugs);
module.exports = router;