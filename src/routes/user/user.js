const express = require('express')
const router = express.Router()
const dotenv = require('dotenv').config();
const db = require('../../config/db');

router.get('/', function (req, res) {
    db.query("SELECT * FROM user", function (error, result, fields) {
        if (error) {
            res.status(500).send({ msg: "internal server error" });
            return;
        }
        res.status(200).send(result)
    })
})

router.get('/todos', function (req, res) {

})

router.get('/:id', function (req, res) {
    db.query("SELECT * FROM user WHERE id = ?", req.params.id, function (error, result, fields) {
        if (error) {
            res.status(500).send({ msg: "internal server error" });
            return;
        }
        res.status(200).send(result)
    })
})

router.put('/:id', function (req, res) {
    var query = "UPDATE user SET email='" + req.body.email + "', name='" + req.body.name + "', firstname='" + req.body.firstname + "', password='" + req.body.password + "' WHERE id=" + req.params.id;
    db.query(query, function (error, result, fields) {
        if (error) {
            res.status(500).send({ msg: "internal server error" });
            return;
        }
        db.query("SELECT * FROM user WHERE id = ?", req.params.id, function (error, result, fields) {
            if (error) {
                res.status(500).send({ msg: "internal server error" });
                return;
            }
            res.status(200).send(result[0])
        })
    })
})

router.delete('/:id', function (req, res) {
    db.query("DELETE FROM user WHERE id = ?", req.params.id, function (error, result, fields) {
        if (error) {
            res.status(500).send({ msg: "internal server error" });
            return;
        }
        res.status(200).send({ msg: "succesfully deleted record number: " + req.params.id });
    })
})

module.exports = router