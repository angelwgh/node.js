const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const moment = require('moment')

const PermissionSchema = new Schema({
    _id: {
        type: String,

        'default': shortid.generate
    },
    name: String,
    api: String,
    enable: Boolean,
    icon: String,
    label: String,
    type: String, 
    parentId: String,
    routePath: String,
    componentPath: String,
    sortId: Number,
    date: { 
        type: Date, 
        default: Date.now,   
    }

})

// api: ""
// comments: "会员管理"
// componentPath: "userManage"
// date: "2017-05-13T13:21:04.780Z"
// enable: true
// icon: "component"
// label: "userManage"
// parentId: "SkFHdYElb"
// routePath: "userManage"
// sortId: 1
// type: "0"
// __v: 0
// _id: "SkFHdYEhg"
// 在调用 toJSON 和 toObject 方法时, 使所有 getters 方法生效
// PermissionSchema.set('toJSON', { getters: true ,virtuals: false, depopulate: true});
// // PermissionSchema.set('toObject', { getters: true, virtuals: true });

// PermissionSchema.path('date').get(function (v) {
//     // console.log(v)
//     return moment(v).format("YYYY-MM-DD HH:mm:ss");
// });

const Permission = mongoose.model("Permission", PermissionSchema);

module.exports = Permission;
