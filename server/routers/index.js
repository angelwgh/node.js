const express = require('express')
const router = express.Router()
const User = require('../controller/User')


router.get('/test', (req, res, next)=> {
	// console.log(User)
	console.log(req.query)
	req.session.user = {
		username: 'angelwgh',
		login: true
	}
	res.send(req.session)
})

router.get('/user/register', (req, res, next)=> {
	// console.log(User)
	User.regAction(req, res, next)
})
module.exports = router