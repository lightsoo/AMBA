/**
 * Created by JiSoo on 2016-10-04.
 */

var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/put', function(req, res, next) {
    db.one("insert into data_store values($1, $2, $3) on conflict (cid, key) do update set value = $4;",
            [req.query.cid, req.query.key, req.query.value, req.query.value])
        .then(function () {
            res.json({
                resultCode: 0
            });
        })
        .catch(function (err) {
            res.json({
                resultCode: -1,
                msg: err
            });
        });
});

router.get('/get', function(req, res, next) {
    db.any("select value from data_store where cid = $1 and key = $2;", [req.query.cid, req.query.key])
        .then(function (data) {
            res.json({
                resultCode: 0,
                info: data
            })
        })
        .catch(function (err) {
            res.json({
                resultCode: -1,
                msg: err
            })
        });
});

router.get('/delete', function(req, res, next) {
    db.one("delete from data_store where cid = $1 and key = $2;", [req.query.cid, req.query.key])
        .then(function (data) {
            res.json({
                resultCode: 0
            })
        })
        .catch(function (err) {
            res.json({
                resultCode: -1,
                msg: err
            })
        });
});

router.get('/list', function(req, res, next) {
    db.any("select key, value from data_store where cid = $1;", [req.query.cid])
        .then(function (data) {
            res.json({
                resultCode: 0,
                info: data
            })
        })
        .catch(function (err) {
            res.json({
                resultCode: -1,
                msg: err
            })
        });
});

router.get('/keys', function(req, res, next) {
    db.any("select key from data_store where cid = $1;", [req.query.cid])
        .then(function (data) {
            res.json({
                resultCode: 0,
                info: data
            })
        })
        .catch(function (err) {
            res.json({
                resultCode: -1,
                msg: err
            })
        });
});

module.exports = router;
