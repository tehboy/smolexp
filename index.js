const express = require('express')
const path = require('path') // Import path module
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')) // Serve the HTML file
})

// Serve all files in the public folder
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
