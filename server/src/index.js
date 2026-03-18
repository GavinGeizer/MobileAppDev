const express = require('express')
const app = express()
const port = 3067

app.get('/transcribe', (req, res) => {
  res.status(200).send('loud and clear')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
