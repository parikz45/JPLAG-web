exports.getHistory = (req, res) => {
  console.log("Returning history:", global.runs)

  res.json(global.runs || [])
}