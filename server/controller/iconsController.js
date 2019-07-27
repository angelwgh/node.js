const fs = require('fs')
const path = require('path')





class Icons {
    init() {
        console.log(this)
    }

    async getIcons() {
        const elementIconsPath = path.resolve(__dirname, '../../public/lib/element-ui/lib/theme-chalk/icon.css');
        await new Promise(resolve => {
            fs.readFile(elementIconsPath, "utf-8", (err, data) => {

                if (!err) {
                    const match = data.match(/(el-icon-[a-zA-Z-]+?)/g);
                    resolve(match)
                }

            })
        })


    }

}

const icons = new Icons()
icons.getIcons().then(res => {
    console.log(res)
})
module.exports = icons;