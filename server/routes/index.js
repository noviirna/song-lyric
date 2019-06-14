const router = require(`express`).Router();

const user = require("./user");
const track = require(`./track`);
const thirdparty = require("./thirdparty")

router.use("/", user)
router.use("/tracks", track)
router.use("/3rdparty", thirdparty);

router.use('/details', require('./detail'))

module.exports = router;
