var Promise = require('promise')
var Bridge = require('../../bridge/bridge')

var auth = {

        testInterface: function (params) {
                console.log("test 2")
                return new Promise(function (resolve, reject) {
                        var callback = function (res) {
                                resolve(res)
                        }
                        // android
                        if (window.nchPlugin) {
                                console.log("test 3_1")
                                var callname = Bridge._dealCallback(callback)
                                window.nchPlugin.testInterface(params, callname)
                        }
                        else {
                                console.log("test 3")
                                Bridge.sendRequest('testInterface', params, callback)
                        }
                });
        },

        /** publicKey 应用公钥
         *  timestamp 时间戳（客服端将校验，一分钟内时间戳有效）
         *  signature 对publicKey+timestamp 签名
         *  建议 signature 使用服务端签名（ecdsa） ，请勿将私钥写在网页中！！
        **/
        login: function (icon, name, publicKey, timestamp, signature) {
                console.log('login')
                return new Promise(function (resolve, reject) {
                        var callback = function (res) {
                                resolve(res)
                        }
                        // android
                        if (window.nchPlugin) {
                                var callname = Bridge._dealCallback(callback)
                                window.nchPlugin.authLogin(icon, name, publicKey, timestamp, signature, callname)
                        }
                        else {
                                var params = {
                                        icon, name, originText, signature
                                }
                                Bridge.sendRequest('authLogin', params, callback)
                        }
                });
        }


}

module.exports = auth
