const axios = require('axios');

const audioDB = axios.create({
  baseURL: `https://theaudiodb.com/api/v1/json/${process.env.AUDIO_DB_KEY}/`
})

class ThirdParty {
  // route inputan
  static findAlbumOrTrack(req, res, next) {
    if (!req.query.song) ThirdParty.getalbum(req, res, next)
    else ThirdParty.gettracklist(req, res, next)
  }

  // dapatkan nama album
  static getalbum(req, res, next) {
    audioDB.get(`searchalbum.php?s=${req.query.artist}`)

    .then(({ data }) => {
      data = data.album.map(album => ({ 
        idAlbum: album.idAlbum,
        image: album.strAlbumThumb,
        name: album.strAlbum 
      }))
      res.json(data)
    })
    .catch(next)
  }

  // dapatkan list lagu (inputnya albumId)
  static gettracklist(req, res, next) {}

  // atau nama satu lagu
  static gettrack(req, res, next) {
    audioDB.get(`searchtrack.php?s=${req.query.artist}&t=${req.query.song}`)

      .then(({ data }) => {
        data = data.track.map(track => ({
          idAlbum: track.idAlbum,
          idTrack: track.idTrack,
          trackName: track.strTrack,
          albumName: track.strAlbum
        }))
        res.json(data)
      })
      .catch(next)
  }

  //input harus ada nama artist dan lyric
  static getlyric(req, res, next) {}

  //translate lyric
  static translate(req, res, next) {}
}

module.exports = ThirdParty;
