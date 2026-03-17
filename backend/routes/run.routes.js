const express = require("express")
const multer = require("multer")

const { runJplag } = require("../controllers/run.controller")

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "storage/uploads")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

const upload = multer({ storage })

router.post(
  "/",
  upload.fields([
    { name: "jar", maxCount: 1 },
    { name: "submissions", maxCount: 500 }
  ]),
  runJplag
)

module.exports = router