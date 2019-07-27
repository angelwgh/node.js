const express = require('express')
const router = express.Router()
const { User } = require('../controller')

router.get('/user/register', (req, res, next)=> {
	// console.log(User)
	User.regAction(req, res, next)
})
router.get('/user/login', (req, res, next)=> {
	// console.log(User)
	User.loginAction(req, res, next)
})

router.get('/user/getUserInfo', (req, res, next)=> {
	// console.log(User)
	User.getUserInfoAction(req, res, next)
})
router.get('/user/getUserPermissions', User.getUserPermissionsAction)

router.get('/user/logout', (req, res, next)=> {
	// console.log(User)
	User.loginOutAction(req, res, next)
})

// router.post('/user/addPermission' ,User.addPermissionAction)

router.get('/user/getMembersList' ,User.getMembersListAction)

router.post('/user/updataMember', User.updataMemberAction)
router.post('/user/addMember', User.addMemberAction)
router.post('/user/delMember', User.delMemberAction)
router.post('/user/setMemberPermissions', User.setMemberPermissionsAction)

module.exports = router;