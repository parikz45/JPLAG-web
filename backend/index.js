const express = require("express")
const cors = require("cors")
const path = require("path")
const fs = require("fs")

const runRoutes = require("./routes/run.routes")
const historyRoutes = require("./routes/history.routes")

const app = express()
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url)
  next()
})

app.use(cors())

app.use(express.json())

global.runs = []

const storagePath = path.join(__dirname, "storage")
const uploadsPath = path.join(storagePath, "uploads")
const resultsPath = path.join(storagePath, "results")
const runsFile = path.join(storagePath, "runs.json")

fs.mkdirSync(uploadsPath, { recursive: true })
fs.mkdirSync(resultsPath, { recursive: true })

if (!fs.existsSync(runsFile)) {
  fs.writeFileSync(runsFile, "[]")
}

app.use("/api/run", runRoutes)
app.use("/api/history", historyRoutes)

app.use(
  "/reports",
  express.static(path.join(__dirname, "storage/results"))
)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})