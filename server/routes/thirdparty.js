const router = require(`express`).Router();
const controller = require('../controllers/thirdparty')

router.get(`/albumlist`, controller.getalbum);
router.get(`/tracklist`, controller.gettracklist);
router.get(`/lyric/:artist/:title`, controller.getlyric);
router.get(`/translate/:targetlang`, controller.translate)
module.exports = router;
