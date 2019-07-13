const config = require('../../configs')
const { User } = require('../controller')

// 校验用户登录状态
module.exports = (req, res, next) =>{
  
    if(req.session.userInfo){
        req.session.logined = true;
        return next()
    }else{
        const user_id = req.signedCookies[config.auth_cookie_name]
        if(!user_id){
            return next()
        }
        User.getOneUserByParams(req, res, {_id: user_id})
            .then(user => {
                if(!user){
                    return next()
                }
                req.session.logined = true ;
                req.session.userInfo = user;
                next()    
            })
        
        
    }

}