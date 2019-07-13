const express = require('express')
const router = express.Router()


const UserRouter = require('./userRouter')
const permissionRouter = require('./permissionRouter')

router.get('/test', (req, res, next)=> {
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

module.exports = router