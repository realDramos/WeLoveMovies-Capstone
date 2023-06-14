const router = require('express').Router({mergeParams: true});
const controller = require('./theaters.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

//only one router cors enabled
router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed)

module.exports = router;