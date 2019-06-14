const {Translate} = require('@google-cloud/translate');


class ThirdParty {
  // dapatkan nama album
  static getalbum(req, res, next) {}

  // dapatkan list lagu (inputnya albumId)
  // atau nama satu lagu
  static gettracklist(req, res, next) {}

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
