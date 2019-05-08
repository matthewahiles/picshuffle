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
  if (!albums.has(albumId)) {
    getImagesFromAlbum(albumId)
      .tap(images => console.log(`Adding ${images.length} images for album ${albumId}`))
      .then(images => albums.set(albumId, images))
      .then(() => {
        const images = albums.get(albumId)
        const randNum = Math.floor(Math.random() * images.length)
        res.send(buildResponse(images[randNum]))
      })
      .catch(() => res.status(400).send(`Cannot find album ${albumId}`))
  } else {
    const images = albums.get(albumId)
    const randNum = Math.floor(Math.random() * images.length)
    res.send(buildResponse(images[randNum]))
  }
}
module.exports = {
  getRandomImage
}
