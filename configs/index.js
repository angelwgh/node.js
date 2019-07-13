/**
 * 站点设置
 */


module.exports = {

    session_secret: 'angelwgh', // 务必修改
    auth_cookie_name: 'angelwgh',
    serverPort: 8081,

    // 数据库配置
    URL: 'mongodb://127.0.0.1:27017/angelwgh',
    DB: 'angelwgh',
    HOST: '127.0.0.1',
    PORT: 27017,
    USERNAME: 'angelwgh',
    PASSWORD: '111111',

   //  密码加密key
    encrypt_key: 'angelwgh',
    redis_ttl: 12,

    lang: 'zh-CN', // 设置默认语言
    languages: ['zh-CN', 'ja_jp', 'en'], // 可选语言



 }

