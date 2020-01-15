
// js call native
var bridge = {

        _callbacks: {},
        _getCallbackName: function () {
                var ramdom = parseInt(Math.random() * 100000)
                return '_callback_' + new Date().getTime() + ramdom
        },

        _dealCallback: function (callback) {
                var callbackName = ""
                if (typeof callback === "function") {
                        callbackName = this._getCallbackName()
                        this._callbacks[callbackName] = callback
                }
                return callbackName
        },

        isBridgeOk: function () {
                return !!(window.nchPlugin || (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.bridgeOk))
        },

        // callback must function
        sendRequest: function (nativeMethod, params, callback) {
                var callbackName = this._dealCallback(callback)

                //ios
                if (window.webkit) {
                        window.webkit.messageHandlers[nativeMethod].postMessage({
                                body: {
                                        'params': params,
                                        'callback': callbackName
                                }
                        });
                }
        },

        //after sendRequest , if have rsp must call this avoid js memeroy leak
        rspCallBack: function (callbackName, result) {
                console.log("test 6 " + callbackName)
                var f = this._callbacks[callbackName]
                f(result)
                delete (this._callbacks[callbackName])
        },


}

module.exports = bridge
