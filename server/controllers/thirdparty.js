
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
        res.json(data)
      })
      .catch(next)
  }
  //input harus ada nama artist dan lyric
  static getlyric(req, res, next) {
    let title = encodeURI(req.params.title);
    axios({
      method: "get",
      target: `https://api.lyrics.ovh/v1/${req.params.artist}/${title}`
    })
      .then((response) => {
        if(response.error){
          next ({ code : 404, message : "not found"})
        } else {
          res.json(response)
        }
      })
      .catch(next);
  }

  //translate lyric
  static translate(req, res, next) {
    // Instantiates a client
    let projectId = process.env.GOOGLE_PROJECT_ID;
    const translate = new Translate({ projectId });

    // The target language
    const target = req.params.targetlang;
    let text = req.body.text
    // Translates some text into Russian
    translate
      .translate(text, target)
      .then(value => {
        console.log(value, "yass");
        res.json({ text, translate: value[0] });
      })
      .catch(next);
  }
}

module.exports = ThirdParty;
