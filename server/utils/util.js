
module.exports = {

    // 封装api返回的数据
    handleApiData (res, resCode, resMsg, data = {}, type = '') {
        let sendData = {
            status: resCode,
            message: resMsg,
            server_time: (new Date()).getTime(),
            data
        }
        return sendData;
    },

    // 封装api返回的错误数据
    handleApiErr(req, res, errCode, errMsg, type = '') {
        if (typeof errMsg == 'object') {
            errMsg = errMsg.message;
        }
        if (type == 'save') {
            errMsg = res.__("resdata_savedata_error", { error: errMsg })
        } else if (type == 'delete') {
            errMsg = res.__("resdata_deldata_error", { error: errMsg })
        } else if (type == 'update') {
            errMsg = res.__("resdata_updatedata_error", { error: errMsg })
        } else if (type == 'getlist') {
            errMsg = res.__("resdata_getlist_error", { error: errMsg })
        } else if (type == 'checkform') {
            errMsg = res.__("resdata_checkformdata_error", { error: errMsg })
        }

        let errorData = {
            status: errCode,
            message: errMsg,
            server_time: (new Date()).getTime(),
            data: {}
        }

        return errorData
    }
}