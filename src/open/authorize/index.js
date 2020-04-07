var Promise = require('promise')
var Bridge = require('../../bridge/bridge')

var auth = {

        authStatus: {
                0: "OK",
                1: "unknow error",
                2: "invalid signature",
                3: "invalid timestamp",
                4: "invalid publicKey",
                5: "user rejected",
        },

        /** 
         *  publicKey DApp publicKey
         *  timestamp Valid for one minute
         *  signature Sha256(timestamp) to hex
         *  {"result": {"publicKey": "048c8a58291eb9ad6df6d7a80e3913fa126d991ba5e57d62403b123e87a09981bdcfcdfbb5029bc8dbe8828af2fa483cdc4b0f890ba81b4ce698b01431e17fe572",
                        "signature": "f9fa0f8f4e7feae4304ac387814a8882b455df7012410903917210c21c05b15d1c495e658f26722fe38689622fc7f1f61d33ddb1270d043ecb7d110459f62477",
                        "timestamp": "1579245008596"},
                "status": 0}
        **/
        login: function (icon, name, publicKey, timestamp, signature) {
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
}

module.exports = auth
