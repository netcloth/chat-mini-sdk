var Promise = require('promise')
var Bridge = require('../../bridge/bridge')

var env = {

        getSystemInfo: function () {
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
                                window.nchPlugin.getSystemInfo(callname)
                        }
                        else {
                                var o = ""
                                Bridge.sendRequest('getSystemInfo', o, callback)
                        }
                });
        },

       
}

module.exports = env
