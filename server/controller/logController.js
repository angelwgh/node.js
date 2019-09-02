const LogModel = require('../models').Log
const { service, util } = require('../utils')
const config = require('../../configs')
const _ = require('lodash')


class Log {
    async getListAction(req, res, next) {

        res.send(req.session.logined)
    }


    async addLog(req, res, next) {

    }
}

module.exports = new Log()