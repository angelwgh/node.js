const express = require('express')
const router = express.Router()


const UserRouter = require('./userRouter')
const permissionRouter = require('./permissionRouter')
const iconsRouter = require('./iconsRouter')

router.get('/test', (req, res, next) => {
    // console.log(User)
    console.log(req.query)
    req.session.user = {
        username: 'angelwgh',
        login: true
    }
    res.send(req.session)
})

router.use('/', UserRouter)
router.use('/', permissionRouter)
router.use('/', iconsRouter)

module.exports = router