var bugs = require("../data/bugs.json");

var getNextId = require('../routes/next-id.js');

module.exports = {
    getAll: function (req, res, cb) {
        let bugsObj = [];
        if (bugs.bugsData) {
            bugs.bugsData.map(bug => {
                if (bug.taskId == req.params.taskId) {
                    bugsObj = [...bugsObj, bug];
                }
            })
        }
        cb(bugsObj);
    },
    getSingle: function (req, res, cb) {
        const id = req.params.id;
        let data = [];
        if (bugs.bugsData) {
            data = bugs.bugsData.filter(record => record.id == id)
        }
        cb(data);
    },
    add: function (req, res, cb) {
        const bug = req.body;
        let bugObj = {
            "id": getNextId(bugs.bugsData),
            "name": bug.name,
            "taskId": req.params.taskId,
            "description": bug.description,
            "status": bug.status
        };
        bugs.bugsData = [...bugs.bugsData, bugObj];
        cb(bugObj);
    },
    update: function (req, res, cb) {
        const bug = req.body;
        let data;
        bugs.bugsData.map((value, index) => {
            if (value.id == bug.id) {
                bugs.bugsData[index].name = bug.name;
                bugs.bugsData[index].description = bug.description;
                bugs.bugsData[index].status = bug.status;
                data = value;
            }
        });
        cb(data);
    },
    delete: function (req, res, cb) {
        const id = req.params.id;
        let index;
        bugs.bugsData.map((value, i) => {
            if (value.id == id) {
                index = i;
            }
        });
        const data = bugs.bugsData.splice(index, 1);
        cb(data);
    }

};