var Promise = require('promise')
var Bridge = require('../../bridge/bridge')

var chat = {
    chatStatus: {
        0: "OK",
        1: "unknow error",
        2: "invalid group id",
        3: "group is dismissed",
        4:"you already in group"
    },
    joinGroup: function (groupID) {
        return new Promise(function (resolve, reject) {
            var callback = function (res) {
                console.log(res)
                var result = JSON.parse(res)
                if (result.status == 0) {
                    resolve(result)
                } else {
                    reject(result)
                }
            }
            // android
            if (window.nchPlugin) {
                var callname = Bridge._dealCallback(callback)
                window.nchPlugin.joinGroup(groupID, callname)
            }
            else {
                var o = new Object()
                o.groupID = groupID
                Bridge.sendRequest('getSystemInfo', o, callback)
            }
        });
    }
}

module.exports = chat