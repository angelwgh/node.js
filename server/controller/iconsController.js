const fs = require('fs')
const path = require('path')

// const UserModel = require('../models').User
// const PermissionModel = require('../models').Permission;
const { service, util } = require('../utils')
const config = require('../../configs')
const _ = require('lodash')




async function getIcons() {
    const elementIconsPath = path.resolve(__dirname, '../../public/lib/element-ui/lib/theme-chalk/icon.css');
    return await new Promise(resolve => {
        fs.readFile(elementIconsPath, "utf-8", (err, data) => {

            if (!err) {
                const reg = /(el-icon-[a-zA-Z1-9-]+):/g
                let match, icons = [],
                    str = data;
                while ((match = reg.exec(str)) !== null) {
                    icons.unshift(match[1])
                }
                resolve(icons)
            }

        })
    })
}


class Icons {

    async getIconsAction(req, res, next) {

        try {
            let iconsList = null
            await getIcons().then(res => {
                iconsList = res
            })

            res.send(util.handleApiData(res, 200, '获取会员列表', iconsList))
        } catch (err) {
            return res.send(util.handleApiErr(req, res, 500, err, 'getlist'))
        }
    }

}

// const icons = 
// icons.getIcons().then(res => {
//     console.log(res)
// })
module.exports = new Icons()