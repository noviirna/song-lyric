const router = require('express').Router();
const detailController = require('../controllers/detail')


router.get('/:search', detailController.getDetailAbout)

module.exports = router
