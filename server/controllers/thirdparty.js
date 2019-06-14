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
  static getlyric(req, res, next) {}

  //translate lyric
  static translate(req, res, next) {
      // Instantiates a client
      let projectId = process.env.GOOGLE_PROJECT_ID 
      const translate = new Translate({projectId});
    
      // The text to translate
      const text = 'Hello, world!';
    
      // The target language
      const target = req.params.targetlang
    
      // Translates some text into Russian
      translate.translate(text, target)
      .then(value=>{
        console.log(value, "yass")
        res.json({text, translate : value[0]})
      }).catch(next)
  }

  static detectlanguage(req,res,next){
      // Instantiates a client
      let projectId = process.env.GOOGLE_PROJECT_ID 
      const translate = new Translate({projectId});
    
      // The text to translate
      const text = 'Hello, world!';
        
      // Translates some text into Russian
      translate.detect(text)
      .then(value=>{
        res.json({input : value.input, language : detection.language})
      }).catch(next)
  }
}

module.exports = ThirdParty;
