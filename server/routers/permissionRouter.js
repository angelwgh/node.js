const express = require('express')
const router = express.Router()
const { Permission } = require('../controller')

router.post('/permission/add', Permission.addAction)
    // router.get('/permission/add', Permission.addAction)

router.post('/permission/updata', Permission.updataAction)
router.get('/permission/getall', Permission.getAllAction)
router.post('/permission/del', Permission.delAction)
module.exports = router