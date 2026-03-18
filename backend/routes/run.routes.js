const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")

const { runJplag } = require("../controllers/run.controller")

const router = express.Router()

// absolute upload directory
const uploadDir = path.join(__dirname, "../storage/uploads")

// ensure upload directory exists
fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500 MB
    files: 1000
  }
})

router.post(
  "/",
  upload.fields([
    { name: "jar", maxCount: 1 },
    { name: "submissions", maxCount: 500 }
  ]),
  runJplag
)

module.exports = router