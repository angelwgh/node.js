const UserModel = require('../models').User
const { service } = require('../utils')
const config = require('../../configs')

class User {
    constructor () {
        this.model = UserModel
    }

    /**
     * 用户注册
     */
    async regAction(req, res, next) {
        // console.log(req.query)
        const query = req.query;
        // console.log(service.encrypt(req.query.password, config.encrypt_key))
        // console.log(service.decrypt(service.encrypt(req.query.password, config.encrypt_key), config.encrypt_key))
        // console.log(res.__('asdas'))
        const userObj = {
            username: query.username,
            name: query.name || '',
            password: service.encrypt(query.password, config.encrypt_key),
            email: query.email || ''
        }

        const user = await UserModel.find({ 'username': query.username }, { password: 0 , __v: 0})
        // console.log(user)
        const newUser = new UserModel(userObj);
        await newUser.save();

        res.send({
            data: user,
            msg: res.__('validate_user_regOk')
        })


    }
}


module.exports = new User()
