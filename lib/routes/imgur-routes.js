const {getImagesFromAlbum} = require('../services/imgur')
const albums = require('../services/storage')

const buildResponse = url => `
  <html prefix="og: http://ogp.me/ns#">  
    <head>
      <meta property="og:type" content = "article" />
      <meta property="og:image:width" content = "1000" />
      <meta property="og:image:height" content = "1000" />
      <meta property="og:image" content = "${url}" />
      <meta name="twitter:card" content = "summary_large_image" />
      <meta name="twitter:image" content = "${url}" />
    </head>
    <body>
      <img src="${url}">
    </body>
  </html>`

const getRandomImage = ({params: {albumId}}, res) => {
  if (albums.has(albumId)) {
    const images = albums.get(albumId)
    const randNum = Math.floor(Math.random() * images.length)
    res.send(buildResponse(images[randNum]))
  } else {
    res.status(404).end()
  }
}

const postAlbum = ({params: {albumId}}, res) => {
  if (albums.has(albumId)) {
    res.status(201).end()
  } else {
    getImagesFromAlbum(albumId)
      .tap(images => console.log(`Adding ${images.length} images for album ${albumId}`))
      .then(images => albums.set(albumId, images))
      .then(() => {
        res.status(201).end()
      })
  }
}

module.exports = {
  getRandomImage,
  postAlbum
}
