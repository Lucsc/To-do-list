const express = require('express')
const router = express.Router()
const dotenv = require('dotenv').config();
const db = require('../../config/db')

router.get('/:id', function(req, res) {
    db.query("SELECT * FROM todo WHERE id = ?", req.params.id, function (error, result, fields) {
        if (error) {
            res.status(500).send({ msg: "internal server error" });
            return;
        }
        res.status(200).send(result)
    })
})

router.put('/:id', function(req, res) {
    var query = "UPDATE todo SET title='" + req.body.title + "', description='" + req.body.description + "', due_time='" + req.body.due_time + "', user_id='" + req.body.user_id + "', status='" + req.body.status + "' WHERE id=" + req.params.id;
    db.query(query, function (error, result, fields) {
        if (error) {
            console.log(error)
            res.status(500).send({ msg: "internal server error" });
            return;
        }
        db.query("SELECT * FROM todo WHERE id = ?", req.params.id, function (error, result, fields) {
            if (error) {
                res.status(500).send({ msg: "internal server error" });
                return;
            }
            res.status(200).send(result[0])
        })
    })
})

router.delete('/:id', function(req, res) {
    db.query("DELETE FROM todo WHERE id = ?", req.params.id, function (error, result, fields) {
        if (error) {
            res.status(500).send({ msg: "internal server error" });
            return;
        }
        res.status(200).send({ msg: "succesfully deleted record number: " + req.params.id });
    })
})

router.get('/', function (req, res) {
    db.query("SELECT * FROM todo", function (error, result, fields) {
        if (error) {
            res.status(500).send({ msg: "internal server error" });
            return;
        }
        res.status(200).send(result)
    })
})

router.post('/', function(req, res) {
    db.query("INSERT INTO todo(title, description, user_id, status, due_time) VALUES(?, ?, ?, ?, ?)", [req.body.title, req.body.description, req.body.user_id, req.body.status, req.body.due_time], function (error, result, fields) {
        if (error) {
            res.status(500).send({ msg: "internal server error" });
            return;
        }
        res.status(200).send(req.body)
    })
})

module.exports = router