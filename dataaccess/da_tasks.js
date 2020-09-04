var tasks = require("../data/tasks.json");

var getNextId = require('../routes/next-id.js');

module.exports = {
    getAll: function (req, res, cb) {
        let tasksObj = [];
        if (tasks.tasksData) {
            tasks.tasksData.map(task => {
                if (task.storyId == req.params.storyId) {
                    tasksObj = [...tasksObj, task];
                }
            })
        }
        cb(tasksObj);
    },
    getSingle: function (req, res, cb) {
        const id = req.params.id;
        let data = [];
        if (tasks.tasksData) {
            data = tasks.tasksData.filter(record => record.id == id)
        }
        cb(data);
    },
    add: function (req, res, cb) {
        const task = req.body;
        let taskObj = {
            "id": getNextId(tasks.tasksData),
            "name": task.name,
            "storyId": req.params.storyId,
            "description": task.description,
            "status": task.status
        };
        tasks.tasksData = [...tasks.tasksData, taskObj];
        cb(taskObj);
    },
    update: function (req, res, cb) {
        const task = req.body;
        let data;
        tasks.tasksData.map((value, index) => {
            if (value.id == task.id) {
                tasks.tasksData[index].name = task.name;
                tasks.tasksData[index].description = task.description;
                tasks.tasksData[index].status = task.status;
                data = value;
            }
        });
        cb(data);
    },
    delete: function (req, res, cb) {
        const id = req.params.id;
        let index;
        tasks.tasksData.map((value, i) => {
            if (value.id == id) {
                index = i;
            }
        });
        const data = tasks.tasksData.splice(index, 1);
        cb(data);
    }

};