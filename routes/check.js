var express = require('express');
var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    var token = req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, 'checking', function (err, decoded) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Invalid Token.'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        return res.status(403).send({
            success: false,
            message: 'No Token Found.'
        });
    }
}