var Promise = require('promise')
var Bridge = require('../../bridge/bridge')


var auth = {

        //originText 传当前 公钥+时间戳 1970
        //建议 signature 使用服务端签名（ecdsa） ，客户端拉去，私钥不建议写在js中（）
        login: function (icon, name, originText, signature) {

                return new Promise(function (resolve, reject) {
                        var callback = function (res) {
                                resolve(res)
                        }
                        // android
                        if (window.nchPlugin) {
                                var callname = Bridge._dealCallback(callback)
                                window.nchPlugin.authLogin(icon, name, originText, signature, callname)
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
