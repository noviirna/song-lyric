const router = require(`express`).Router();
const controller = require('../controllers/thirdparty')

router.get('/findbyparam', controller.findAlbumOrTrack)
router.get(`/albumlist`, controller.getalbum);
router.get(`/tracklist`, controller.gettracklist);
router.get(`/lyric/:artist/:title`, controller.getlyric);
  
module.exports = router;
