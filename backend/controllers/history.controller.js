const fs = require("fs")
const path = require("path")

exports.getHistory = (req, res) => {

  const historyPath = path.join(__dirname, "../storage/runs.json")

  if (!fs.existsSync(historyPath)) {
    return res.json([])
  }

  const runs = JSON.parse(fs.readFileSync(historyPath))

  res.json(runs)

}