const express = require('express')
const router = express.Router()
const { Icons } = require('../controller')

router.get('/icons/geticons', Icons.getIconsAction)


module.exports = router;