const rp = require('request-promise')
const { imgur: { clientId } } = require('./config.json')

const options = (albumId) => ({
  uri: `https://api.imgur.com/3/album/${albumId}`,
  headers: { Authorization: `Client-ID ${clientId}` },
  json: true
})

const getImagesFromAlbum = (albumId) =>
  rp(options(albumId))
    .then(({ data }) => data.images.map(({ link }) => link))

module.exports = { getImagesFromAlbum }
