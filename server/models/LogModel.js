const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const moment = require('moment')

const LogSchema = new Schema({
    _id: {
        type: String,

        'default': shortid.generate
    },
    ip: String,
    user: String,
    content: String


})

const Log = mongoose.model("Log", LogSchema);

module.exports = Log;