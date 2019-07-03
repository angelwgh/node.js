
const fs = require('fs');
const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const language = require('./middleware/language')
const config = require('../configs')
// const nunjucks = require('nunjucks')
const router = require('./routers')

const app = express()


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