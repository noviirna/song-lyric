class ThirdParty {
  // dapatkan nama album
  static getalbum(req, res, next) {}

  // dapatkan list lagu (inputnya albumId)
  // atau nama satu lagu
  static gettracklist(req, res, next) {}

  //input harus ada nama artist dan lyric
  static getlyric(req, res, next) {}

  //translate lyric
  static translate(req, res, next) {}
}

module.exports = ThirdParty;
