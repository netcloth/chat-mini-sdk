var Promise = require('promise')
var Bridge = require('../../bridge/bridge')

var auth = {

        authStatus: {
                0: "OK",
                1: "unknow error",
                2: "invalid signature",
                3: "invalid timestamp",
                4: "invalid publicKey"
        },

        /** 
         *  publicKey 应用公钥
         *  timestamp 时间戳（客服端将校验，一分钟内时间戳有效）
         *  signature 对 timestamp 进行 Sha3 后签名的十六进制结果
         *  建议 signature 使用服务端签名（ecdsa） ，请勿将私钥写在网页中！！
         *  result: { status : 0 , result : "" }
        **/
        login: function (icon, name, publicKey, timestamp, signature) {
                console.log('login')
                return new Promise(function (resolve, reject) {
                        var callback = function (res) {
                                if (res.status = 0) {
                                        resolve(res)
                                } else {
                                        reject(res)
                                }
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
        },

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
}

module.exports = auth
