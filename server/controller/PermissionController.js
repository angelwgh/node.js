const PermissionModel = require('../models').Permission;
const { service , util} = require('../utils');
const config = require('../../configs');
const formidable = require('formidable');
const _ = require('lodash')

class Permission {
    constructor () {}

    async addAction ( req, res, next){
        // const form = new formidable.IncomingForm()
        // console.log(form)
        // form.parse(req, async (err, fields, files) => {
        //     console.log(fields)
        //     console.log(files)
            
        // })
        const permission = new PermissionModel(req.body)
        await permission.save()
        
        res.send(util.handleApiData(res, 200, '添加成功成功', {}))
        
    }

    async getAllAction (req, res, next){
        if(req.session.logined){
            const permission = await PermissionModel.find({}, {__v: 0})

            res.send(util.handleApiData(res, 200, '', permission))
        }else{
            res.send(util.handleApiErr(req, res, 500, res.__("label_notice_asklogin")))
        }
        

    }

    async delAction(req, res, next){
        const _id = req.body.id

        if(!req.session.logined){
            return res.send(util.handleApiErr(req, res, 500, res.__("label_notice_asklogin")))
        }
        
        const children = await PermissionModel.find({parentId: _id}, {__v: 0})
        if(!_.isEmpty(children)){
            res.send(util.handleApiErr(req, res, 500, '请先删除所有子菜单'))
        }else{
            await PermissionModel.deleteOne({
                    _id
                })
            res.send(util.handleApiData(res, 200, '删除成功', {}))
        }
    }
}

module.exports = new Permission()