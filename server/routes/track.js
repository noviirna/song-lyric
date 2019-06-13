const router = require(`express`).Router();
const controller = require("../controllers/track");
const { authentication, authorization } = require(`../middlewares/auth`);

router.use(authentication);

router.get(`/`, controller.all);
router.post(`/`, controller.create);
router.delete(`/:id`, authorization, controller.delete);

module.exports = router;
