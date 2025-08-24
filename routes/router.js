const router = require('express').Router();

//Services router
const serviceRouter = require('./service');
router.use('/', serviceRouter);

//Parties router
const partyRouter = require('./parties');
router.use('/', partyRouter);

module.exports = router;
