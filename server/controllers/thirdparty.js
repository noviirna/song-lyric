
const {Translate} = require('@google-cloud/translate');
const axios = require('axios');
const audioDB = axios.create({
  baseURL: `https://theaudiodb.com/api/v1/json/${process.env.AUDIO_DB_KEY}/`
})

class ThirdParty {
  // route inputan
  static findAlbumOrTrack(req, res, next) {
    if (!req.query.song) ThirdParty.getalbum(req, res, next)
    else ThirdParty.gettrack(req, res, next)
  }

  
  // dapatkan nama album
  static getalbum(req, res, next) {
    audioDB.get(`searchalbum.php?s=${req.query.artist}`)
    .then(({ data }) => {
      if (!data.album) throw { code: 404, message: `album not found` }
      res.json(data)
    })
    .catch(next)
  }

  // dapatkan list lagu (inputnya albumId)
  static gettracklist(req, res, next) {
    audioDB.get(`track.php?m=${req.query.idAlbum}`)
    .then(({ data }) => {
      if (!data.track) throw { code: 404, message: `album not found` }
      res.json(data)
    })
    .catch(next)
  }

  // atau nama satu lagu
  static gettrack(req, res, next) {
    audioDB.get(`searchtrack.php?s=${req.query.artist}&t=${req.query.song}`)
      .then(({ data }) => {
        if (!data.track) throw { code: 404, message: `track not found` }
        res.json(data)
      })
      .catch(next)
  }
  //input harus ada nama artist dan lyric
  static getlyric(req, res, next) {
    let title = encodeURI(req.params.title)
    
    axios({
      method: "get",
      url: `https://api.lyrics.ovh/v1/${req.params.artist}/${title}`
    })
      .then(function({data}) {
        if(data.error){
          next ({ code : 404, message : "not found"})
        } else {
        let lyric = data.lyrics
         lyric = lyric.replace(/\n/g, "<br />");
        res.json(lyric)
        }
      })
      .catch(next);
  }

  //translate lyric
  static translate(req, res, next) {
    let projectId = process.env.GOOGLE_PROJECT_ID;
    const translate = new Translate({ projectId });

    const target = req.params.targetlang;
    let text = req.body.text
    translate
      .translate(text, target)
      .then(value => {
        res.json({ text, translate: value[0] });
      })
      .catch(next);
  }
}

module.exports = ThirdParty;
