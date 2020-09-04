module.exports = function (data) {
    if (data && Array.isArray(data) && data.length > 0) {
        let ids = [];
        data.map(obj => ids = [...ids, obj.id]);
        return Math.max(...ids) + 1;
    }
    else {
        return 1;
    }
}