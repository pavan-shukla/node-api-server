var employees = require("../data/employee.json");
var emp_pwds = require("../data/employee-passwords.json");

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
        if (emp_pwds.employeesData) {
            let role = emp_pwds.employeesData.filter(record => record.id == req.params.id);
            if (role.length != 0)
                data[0]['role'] = role[0].role;
        }
        cb(data);
    },
    add: function (req, res, cb) {
        const employee = req.body;
        const empId = getNextId(employees.employeesData);
        let employeeObj = {
            "id": empId,
            "email": employee.email,
            "name": employee.name,
            "designation": employee.designation,
            "platform": employee.platform,
            "projectId": employee.project
        };
        let empPwdObj = {
            "id": empId,
            "email": employee.email,
            "password": employee.password,
            "role": employee.role
        };
        employees.employeesData = [...employees.employeesData, employeeObj];
        emp_pwds.employeesData = [...emp_pwds.employeesData, empPwdObj];
        cb(employeeObj);
    },
    update: function (req, res, cb) {
        const employee = req.body;
        let data;
        employees.employeesData.map((value, index) => {
            if (value.id == employee.id) {
                // employees.employeesData[index].email = employee.email;
                // employees.employeesData[index].password = employee.password;
                employees.employeesData[index].name = employee.name;
                employees.employeesData[index].designation = employee.designation;
                employees.employeesData[index].platform = employee.platform;
                employees.employeesData[index].projectId = employee.project;
                data = value;
            }
        });
        cb(data);
    },
    delete: function (req, res, cb) {
        const id = req.params.id;
        let indexEmp;
        let indexEmpPwd;
        employees.employeesData.map((value, i) => {
            if (value.id == id) {
                indexEmp = i;
            }
        });
        emp_pwds.employeesData.map((value, j) => {
            if (value.id == id) {
                indexEmpPwd = j;
            }
        });
        const data = employees.employeesData.splice(indexEmp, 1);
        emp_pwds.employeesData.splice(indexEmpPwd, 1);
        cb(data);
    }
};