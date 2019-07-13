const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const moment = require('moment')
const Permission = require('./PermissionModel')

const UserSchema = new Schema({
    _id: {
        type: String,

        'default': shortid.generate
    },
    name: String,
    username: String,
    password: String,
    email: String,
    permissions: {
        type: String,
        ref: 'Permission'
    },
    date: { type: Date, default: Date.now }
})


// console.log(UserSchema.path('data'))
const User = mongoose.model("User", UserSchema);

module.exports = User;