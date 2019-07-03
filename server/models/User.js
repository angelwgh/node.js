var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');
var moment = require('moment')

var UserSchema = new Schema({
    _id: {
        type: String,

        'default': shortid.generate
    },
    name: String,
    username: String,
    password: String,
    email: String,
    date: { type: Date, default: Date.now }
})


console.log(UserSchema.path('data'))
var User = mongoose.model("User", UserSchema);

module.exports = User;