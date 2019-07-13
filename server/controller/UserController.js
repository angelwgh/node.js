const UserModel = require('../models').User
const { service , util} = require('../utils')
const config = require('../../configs')

class User {
    constructor () {
        this.model = UserModel
    }

    /**
     * 用户注册
     */
    async regAction(req, res, next) {
        
        const query = req.query;
        const userObj = {
            username: query.username,
            name: query.name || '',
            password: service.encrypt(query.password, config.encrypt_key),
            email: query.email || ''
        }

        const user = await UserModel.find({ 'username': query.username }, { password: 0 , __v: 0})

        const newUser = new UserModel(userObj);
        await newUser.save();

        res.send({
            data: user,
            msg: res.__('validate_user_regOk')
        })


    }

    /**
     *  用户登录
     */
    async loginAction(req, res, next){
        
        const errorMsg = '';
        // console.log(res)
        const userObj = {
            username: req.query.username,
            password: service.encrypt(req.query.password, config.encrypt_key)
        }

       
        const user = await UserModel.findOne(userObj, {password: 0})
        if(!user){
            res.send(util.handleApiErr(req, res, 500, res.__("validate_login_notSuccess")))
        }
        else {
            // req.session.logined = true;
            req.session.userInfo = user;
            res.cookie(config.auth_cookie_name, user._id, 
                { path: '/', maxAge: 1000 * 60 * 60 * 24 * 30, signed: true, httpOnly: true }) //cookie 有效期30天
            res.send(util.handleApiData(res, 200, '登录成功', {}))
        }
    }

    /**
     * 退出登录
     */
    async loginOutAction(req, res, next){
        req.session.destroy();
        res.clearCookie(config.auth_cookie_name, { path: '/' });
        res.send(util.handleApiData(res, 200, res.__("validate_user_logoutOk")));
    }

    /**
     * 获取用户信息
     */
    async getUserInfoAction(req, res, next){
        if(req.session.logined){
            // const user = await UserModel.find({ 'username': query.username }, { password: 0 , __v: 0})
            const username = req.session.userInfo.username
            const user = await UserModel.findOne({ 'username': username }, { password: 0 , __v: 0})
                .populate({
                    path: 'permissions',
                    select: 'date'
                }).exec()
            

            res.send(util.handleApiData(res, 200, '', user))
        }else{
            return res.send(util.handleApiErr(req, res, 500, res.__("label_notice_asklogin")))
        }
    }

    /**
     * 查找一个用户
     */
    async getOneUserByParams(req, res, params) {
        return await UserModel.findOne(params, { password: 0 });
    }

    // 给用户添加权限
    async addPermissionAction(req, res, next) {
        const username = req.session.userInfo.username
        const user = await UserModel.findOne({ 'username': username }, { password: 0 , __v: 0})
        await UserModel.findOneAndUpdate({'username': username}, {$set: {permissions: req.body.id}})
        res.send(user)
    }
}


module.exports = new User()
