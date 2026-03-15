const express = require("express")
const cors = require("cors")
const path = require("path")

const runRoutes = require("./routes/run.routes")
const historyRoutes = require("./routes/history.routes")

const app = express()

app.use(cors())
app.use(express.json())

// routes
app.use("/api/run", runRoutes)
app.use("/api/history", historyRoutes)

// serve reports
app.use(
  "/reports",
  express.static(path.join(__dirname, "storage/results"))
)

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})