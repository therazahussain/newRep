const { getBoolean } = require('../controller/booleanbotController.js');

const router = require('express').Router();


router.post("/boolean", getBoolean);


module.exports = router;