var express = require('express');

var da_projects = require('../dataaccess/da_projects');
var da_employees = require('../dataaccess/da_employees');
var da_stories = require('../dataaccess/da_stories');
var da_tasks = require('../dataaccess/da_tasks');
var da_bugs = require('../dataaccess/da_bugs');
var check = require('./check');

var da = {};

module.exports = function (context) {

    var router = express.Router({ mergeParams: true });
    let contextTemp = context;
    if (contextTemp == "projects") {
        da[contextTemp] = da_projects;
    } else if (contextTemp == "employees") {
        da[contextTemp] = da_employees;
    } else if (contextTemp == "stories") {
        da[contextTemp] = da_stories;
    } else if (contextTemp == "tasks") {
        da[contextTemp] = da_tasks;
    } else if (contextTemp == "bugs") {
        da[contextTemp] = da_bugs;
    }



    router.get('/', check, function (req, res, next) {
        da[contextTemp].getAll(req, res, function (data) {
            res.send(data);
        });
    });

    router.get('/:id', check, function (req, res, next) {
        da[contextTemp].getSingle(req, res, function (data) {
            res.send(data);
        });
    });

    router.post('/add', check, function (req, res, next) {
        da[contextTemp].add(req, res, function (data) {
            if (data) {
                res.send({
                    success: true,
                    message: 'created successfully'
                });
            }
            else {
                res.send({
                    success: false,
                    message: 'Something went wrong'
                });
            }
        });
    });

    router.put('/', check, function (req, res, next) {
        da[contextTemp].update(req, res, function (data) {
            if (data) {
                res.send({
                    success: true,
                    message: 'updated successfully'
                });
            }
            else {
                res.send({
                    success: false,
                    message: 'Something went wrong'
                });
            }
        });
    });

    router.delete('/:id', check, function (req, res, next) {
        da[contextTemp].delete(req, res, function (data) {
            if (data) {
                res.send({
                    success: true,
                    message: 'deleted successfully'
                });
            }
            else {
                res.send({
                    success: false,
                    message: 'Something went wrong'
                });
            }
        });
    });
    return router;
}