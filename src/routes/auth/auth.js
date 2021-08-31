const express = require('express')
const router = express.Router()
const dotenv = require('dotenv').config();
const db = require('../../config/db')
const bcrypt = require("bcryptjs")

router.post('/register', function (req, res) {
    var newpassword;
    console.log(req.body)
    db.query("SELECT * FROM user WHERE email = ?", req.body.email, function (error, result, fields) {
        if (error) {
            res.status(500).send({ msg: "internal server error" });
            return;
        }
        if (result.length == 1) {
            res.status(500).send({ msg: "account already exists" });
            return;
        }
        bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) {
                    res.status(500).send({ msg: "internal server error" });
                    return;
                }
                newpassword = hash;
                db.query("INSERT INTO user(email, name, firstname, password) VALUES(?, ?, ?, ?)", [req.body.email, req.body.name, req.body.firstname, newpassword], function (error, result, fields) {
                    if (error) {
                        res.status(500).send({ msg: "internal server error" });
                        return;
                    }
                    res.status(200).send({ token: 'Token of the newly registered user' })
                })
            }))
    })
})

router.post('/login', function (req, res) {
    console.log(req.body)
    db.query("SELECT * FROM user WHERE email = ?", req.body.email, function (error, result, fields) {
        if (error) {
            res.status(500).send({ msg: "internal server error" });
            return;
        }
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, match) => {
                if (err) {
                    res.status(500).send({ msg: "internal server error" });
                    return;
                }
                if (match) {
                    res.status(200).send({ token: "Token of the newly logged in user" });
                    return;
                } else {
                    res.status(401).send({ msg: "Invalid Credentials" });
                    return;
                }
            })
        } else {
            res.status(401).send({ msg: "Invalid Credentials" });
            return;
        }
    })
})

module.exports = router