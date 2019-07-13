
const fs = require('fs');
const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const language = require('./middleware/language')
const authUser = require('./middleware/authUser')
const config = require('../configs')
// const nunjucks = require('nunjucks')
const router = require('./routers')

const app = express()


// body 解析中间件
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// cookie 解析中间件
app.use(cookieParser(config.session_secret))



// session配置

let sessionConfig = {
    secret: config.encrypt_key,
        cookie: {
            maxAge: 1000 * 60 * 60 * config.redis_ttl
        },
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            db: "session",
            host: "localhost",
            port: config.PORT,
            url: 'mongodb://'+ config.HOST + ':' + config.PORT + '/' + config.DB + ''
        })
}


app.use(session(sessionConfig));

app.use(language)
// // 鉴权用户
app.use(authUser)


app.use('/', router)


// nunjucks.configure(path.join(__dirname, '../views'), { // 设置模板文件的目录，为views
//     noCache: process.env.NODE_ENV !== 'production',
//     autoescape: true,
//     express: app
// });

const port = process.env.PORT || config.serverPort
app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})