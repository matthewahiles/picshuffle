const express = require('express')
const {getRandomImage} = require('./lib/routes/imgur-routes')

const app = express()

// Redirect to sfw album hardcoded for now
app.get('/', (req, res) => res.redirect('/vgW1p'))
app.get('/:albumId', getRandomImage)

app.listen(3000, () => console.log('Server listening on 3000'))
