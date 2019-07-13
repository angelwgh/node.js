const i18n = require('i18n');
const config = require('../../configs')
const path = require('path')

module.exports = (req, res, next) => {
    let languages = config.languages;
    let locale;

    i18n.configure({
        locales: languages,  //声明包含的语言
        register: res,
        directory:path.resolve(__dirname, '../locals/languages'), //翻译json文件的路径
        defaultLocale: config.lang,   //默认的语言，即为上述标准4
        indent: "\t"
    });

    // if (req.cookies['locale']) {
    //     locale = req.cookies['locale'];
    // }

    if (!~languages.indexOf(locale)) {
        locale = config.lang;
    }

    // console.log(locale)
    // 设置i18n对这个请求所使用的语言
    res.setLocale(locale);

    next();
}