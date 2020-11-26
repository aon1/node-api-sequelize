const express = require("express");
const router = express.Router();
const expressJoi = require("express-validation");

const wordController = require("../controllers/word");

router.get("/", wordController.index);

module.exports = router;
