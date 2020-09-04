var projects = require("../data/projects.json");

var getNextId = require('../routes/next-id.js');

module.exports = {

    getAll: function (req, res, cb) {
        cb(projects.projectsData);
    },
    getSingle: function (req, res, cb) {
        const id = req.params.id;
        let data = [];
        if (projects.projectsData) {
            data = projects.projectsData.filter(record => record.id == id);
        }
        cb(data);
    },
    add: function (req, res, cb) {
        const project = req.body;
        let projectprojects = {
            "id": getNextId(projects.projectsData),
            "name": project.name,
            "description": project.description
        };
        projects.projectsData = [...projects.projectsData, projectprojects];
        cb(projectprojects);
    },
    update: function (req, res, cb) {
        const project = req.body;
        let data;
        projects.projectsData.map((value, index) => {
            if (value.id == project.id) {
                projects.projectsData[index].name = project.name;
                projects.projectsData[index].description = project.description;
                data = value;
            }
        });
        cb(data);
    },
    delete: function (req, res, cb) {
        const id = req.params.id;
        let index;
        projects.projectsData.map((value, i) => {
            if (value.id == id) {
                index = i;
            }
        });
        const data = projects.projectsData.splice(index, 1);
        cb(data);
    }

};