const { executeJplag } = require("../services/jplag.service")
const fs = require("fs")
const path = require("path")

exports.runJplag = async (req, res) => {

  try {
    const config = req.body

    const runId = Date.now()

    const resultPath = path.join(
      __dirname,
      "../storage/results/run-" + runId
    )

    await executeJplag(config, resultPath)

    const historyPath = path.join(__dirname, "../storage/runs.json")

    let runs = []

    if (fs.existsSync(historyPath)) {
      runs = JSON.parse(fs.readFileSync(historyPath))
    }

    runs.push({
      id: runId,
      language: config.language,
      path: resultPath,
      timestamp: new Date()
    })

    fs.writeFileSync(historyPath, JSON.stringify(runs, null, 2))

    res.json({
      success: true,
      runId
    })

  } catch (err) {

    console.error(err)

    res.status(500).json({
      error: "Failed to run JPlag"
    })

  }

}