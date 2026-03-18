const path = require("path")
const fs = require("fs")
const { executeJplag } = require("../services/jplag.service")

exports.runJplag = async (req, res) => {
  console.log("RUN ENDPOINT HIT")
  console.log("FILES:", req.files)
  console.log("BODY:", req.body)
}

exports.runJplag = async (req, res) => {
  try {

    if (!req.files || !req.files.jar || !req.files.submissions) {
      return res.status(400).json({
        error: "Jar file or submissions missing"
      })
    }

    let config = {}
    try {
      config = JSON.parse(req.body.config || "{}")
    } catch {
      config = {}
    }

    const runId = Date.now()

    const jarFile = req.files.jar[0]
    const submissions = req.files.submissions

    const submissionsFolder = path.join(
      __dirname,
      "../storage/uploads/run-" + runId
    )

    const resultPath = path.join(
      __dirname,
      "../storage/results/run-" + runId
    )

    fs.mkdirSync(submissionsFolder, { recursive: true })
    fs.mkdirSync(resultPath, { recursive: true })

    // move submission files
    for (const file of submissions) {
      const dest = path.join(submissionsFolder, file.originalname)
      fs.renameSync(file.path, dest)
    }

    console.log("Jar path:", jarFile.path)
    console.log("Submissions folder:", submissionsFolder)
    console.log("Result path:", resultPath)

    await executeJplag(
      config,
      jarFile.path,
      submissionsFolder,
      resultPath
    )

    const zipName = `run-${runId}.zip`

    const historyPath = path.join(__dirname, "../storage/runs.json")

    let runs = []

    if (fs.existsSync(historyPath)) {
      runs = JSON.parse(fs.readFileSync(historyPath, "utf-8"))
    }

    runs.push({
      id: runId,
      language: config.language,
      zip: zipName,
      timestamp: new Date()
    })

    fs.writeFileSync(historyPath, JSON.stringify(runs, null, 2))

    res.json({
      success: true,
      runId,
      zip: zipName
    })

  } catch (err) {
    console.error("JPlag execution error:", err)

    res.status(500).json({
      error: "JPlag execution failed",
      message: err.message
    })
  }
}