// hash加密
const crypto = require('crypto'); 
// 文件操作
const fs = require('fs')

const url = require('url');

class systemService {
    constructor () {

    }


    /**
     * 密码加密
     * @param {*} data 
     * @param {*} key 
     */
    encrypt(data, key) {
        let cipher = crypto.createCipher("bf", key);
        let newPsd = "";
        newPsd += cipher.update(data, "utf8", "hex");
        newPsd += cipher.final("hex");

        return newPsd
    }

    /**
     * 密码解密
     * @param {*} data 
     * @param {*} key 
     */
    decrypt (data, key) { //密码解密
        let decipher = crypto.createDecipher("bf", key);
        let oldPsd = "";
        oldPsd += decipher.update(data, "hex", "utf8");
        oldPsd += decipher.final("utf8");
        return oldPsd;
    }
}

module.exports = new systemService()