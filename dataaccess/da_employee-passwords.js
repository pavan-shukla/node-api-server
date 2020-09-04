var employees = require("../data/employee-passwords.json");

var getNextId = require('../routes/next-id.js');

module.exports = {
    getAll: function (req, res, cb) {
        cb(employees.employeesData);
    },
    getSingle: function (req, res, cb) {
        let data = [];
        if (employees.employeesData) {
            data = employees.employeesData.filter(record => record.id == req.params.id)
        }
        cb(data);
    },
    checkIfExists: function (email) {
        let data = [];
        if (employees.employeesData) {
            data = employees.employeesData.filter(record => record.email == email);
        }
        return data.length != 0;
    },
    validateUser: function (email, password) {
        let data = [];
        if (employees.employeesData) {
            data = employees.employeesData.filter(record => record.email == email && record.password == password);
        }
        return data.length != 0;
    },
    getUser: function (email) {
        let data;
        if (employees.employeesData) {
            data = employees.employeesData.filter(record => record.email == email);
        }
        return data && data.length > 0 ? data[0] : data;
    }

};