const express = require('express')
const path = require('path') // Import path module
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')) // Serve the HTML file
})

// Serve smoltalk.js when /smoltalk.js is requested
app.get('/smoltalk.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'smoltalk.js')) // Serve the JS file
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
