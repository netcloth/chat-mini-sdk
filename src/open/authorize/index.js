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
         *  signature 对 timestamp 进行 Sha256 后签名的十六进制结果
         *  建议 signature 使用服务端签名（ecdsa） ，请勿将私钥写在网页中！！
         *  {"result": {"publicKey": "048c8a58291eb9ad6df6d7a80e3913fa126d991ba5e57d62403b123e87a09981bdcfcdfbb5029bc8dbe8828af2fa483cdc4b0f890ba81b4ce698b01431e17fe572",
                        "signature": "622b052254f3ee14373b43a8fe2f2e646043aff117a10004a2e19e2addad3b4f7d17eea37a1568824acf2c1980609764d9096d63bd0ca68f56a233403ff3dc2b",
                        "timestamp": "1579155698774"},
                "status": 0}
        **/
        login: function (icon, name, publicKey, timestamp, signature) {
                return new Promise(function (resolve, reject) {
                        var callback = function (res) {
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
                                window.nchPlugin.authLogin(icon, name, publicKey, timestamp.toString(), signature, callname)
                        }
                        else {
                                console.log('login 2 ')
                                var o = new Object()
                                o.icon = icon
                                o.name = name
                                o.publicKey = publicKey
                                o.timestamp = timestamp
                                o.signature = signature

                                console.log('login 2 ' + o)
                                Bridge.sendRequest('authLogin', o, callback)
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
