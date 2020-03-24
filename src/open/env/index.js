var Promise = require('promise')
var Bridge = require('../../bridge/bridge')

var env = {

        envStatus: {
                0: "OK",
                1: "unknow error",
                2: "set proxy failed",
                3: "user reject to set proxy"
        },

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

        setProxy: function (host, port) {
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
                                window.nchPlugin.setProxy(host, port, callname)
                        }
                        else {
                                var o = new Object()
                                o.host = host
                                o.port = port
                                Bridge.sendRequest('setProxy', o, callback)
                        }
                });
        },

        revertProxy: function () {
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
                                window.nchPlugin.revertProxy(callname)
                        }
                        else {
                                var o = new Object()
                                o.host = host
                                o.port = port
                                Bridge.sendRequest('setProxy', o, callback)
                        }
                });
        }
}

module.exports = env
