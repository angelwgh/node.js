const express = require('express')
const router = express.Router()
const { Log } = require('../controller')

router.get('/log/getlist', Log.getListAction)


module.exports = router;