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
    group: String,
    enable:String,
    tel: String,
    permissions: [{
        type: String,
        ref: 'Permission'
    }],
    date: { type: Date, default: Date.now }
})

UserSchema.set('toJSON', { getters: true ,virtuals: false});
// UserSchema.set('toObject', { getters: true, virtuals: true });

UserSchema.path('date').get(function (v) {
    // console.log(v)
    return moment(v).format("YYYY-MM-DD HH:mm:ss");
});

// console.log(UserSchema.path('data'))
const User = mongoose.model("User", UserSchema);

module.exports = User;