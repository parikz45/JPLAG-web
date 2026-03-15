const express = require("express")
const router = express.Router()

const { runJplag } = require("../controllers/run.controller")

router.post("/", runJplag)

module.exports = router