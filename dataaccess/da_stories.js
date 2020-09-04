var stories = require("../data/stories.json");

var getNextId = require('../routes/next-id.js');

module.exports = {
    getAll: function (req, res, cb) {
        let storiesObj = [];
        if (stories.storiesData) {
            stories.storiesData.map(story => {
                if (story.projectId == req.query.projectId) {
                    storiesObj = [...storiesObj, story];
                }
            });
        }
        cb(storiesObj);
    },
    getSingle: function (req, res, cb) {
        const id = req.params.id;
        let data = [];
        if (stories.storiesData) {
            data = stories.storiesData.filter(record => record.id == id)
        }
        cb(data);
    },
    add: function (req, res, cb) {
        const story = req.body;
        let storyObj = {
            "id": getNextId(stories.storiesData),
            "projectId": story.projectId,
            "name": story.name,
            "description": story.description,
            "status": story.status
        };
        stories.storiesData = [...stories.storiesData, storyObj];
        cb(storyObj);
    },
    update: function (req, res, cb) {
        const story = req.body;
        let data;
        stories.storiesData.map((value, index) => {
            if (value.id == story.id) {
                stories.storiesData[index].name = story.name;
                stories.storiesData[index].description = story.description;
                stories.storiesData[index].status = story.status;
                data = value;
            }
        });
        cb(data);
    },
    delete: function (req, res, cb) {
        const id = req.params.id;
        let index;
        stories.storiesData.map((value, i) => {
            if (value.id == id) {
                index = i;
            }
        });
        const data = stories.storiesData.splice(index, 1);
        cb(data);
    }

};