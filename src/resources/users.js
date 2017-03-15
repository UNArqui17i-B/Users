'use strict';

const express = require('express');
const status = require('http-status');

module.exports = function (User) {
    const router = express.Router();

    // list of all books
    router.get('/', function (req, res) {
        User.findAll((err, header, body) => {
            if (body) {
                res.status(status.OK).send(body.rows);
            } else {
                res.status(header.statusCode).send({});
            }
        });
    });

    // search for id
    router.get('/:id', function (req, res) {
        User.findById(req.params.id, (err, header, body) => {
            if (body) {
                res.status(status.OK).send(body);
            } else {
                res.status(header.statusCode).send({});
            }
        });
    });

    // create a User
    router.post('/', function (req, res) {
        User.create(req.body, (err, header, body) => {
            if (!body || err) {
                res.status(header.statusCode).send(body || {});
            } else {
                res.status(status.CREATED).send(body);
            }
        });
    });

    // update a User
    router.put('/:id/:rev', function (req, res) {
        User.update(req.params.id, req.params.rev, req.body, (err, header, body) => {
            if (body) {
                res.status(status.OK).send(body);
            } else {
                res.status(header.statusCode).send({});
            }
        });
    });

    // delete a User
    router.delete('/:id/:rev', function (req, res) {
        User.delete(req.params.id, req.params.rev, (err, header, body) => {
            if (body) {
                res.status(status.ACCEPTED).send(body);
            } else {
                res.status(header.statusCode).send({});
            }
        });
    });

    return router;
};
