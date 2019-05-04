const express = require('express')
const app = express()
const {getImagesFromAlbum} = require('./imgur')

const albums = new Map()

app.get('/:albumId', ({params: {albumId}}, res) => {
  if (albums.has(albumId)) {
    const images = albums.get(albumId)
    res.send(`<img src=${images[Math.random(0, images.length)]}>`)
  } else {
    res.status(404).end()
  }
})

app.post('/:albumId', ({params: {albumId}}, res) => {
  if (albums.has(albumId)) {
    res.status(201).end()
  } else {
    getImagesFromAlbum(albumId)
      .then(images => albums.set(albumId, images))
      .then(() => {
        res.status(201).end()
      })
  }
})
    
app.listen(3000)

