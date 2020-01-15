var Promise = require('promise')
var Bridge = require('../../bridge/bridge')


var auth = {

        /** publicKey 应用公钥
         *  timestamp 时间戳（客服端校验前后1分钟）
         *  signature 对publicKey+timestamp 签名
         *  建议 signature 使用服务端签名（ecdsa） ，请勿将私钥写在网页中！！
        **/
        login: function (icon, name, publicKey, timestamp, signature) {

                return new Promise(function (resolve, reject) {
                        var callback = function (res) {
                                resolve(res)
                        }
                        // android
                        if (window.nchPlugin) {
                                var callname = Bridge._dealCallback(callback)
                                window.nchPlugin.authLogin(icon, name,  publicKey, timestamp, signature, callname)
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
