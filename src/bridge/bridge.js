
// js call native
var bridge = {

        _callbacks: {},
        _getCallbackName: function () {
                var ramdom = parseInt(Math.random() * 100000)
                return '_callback_' + new Date().getTime() + ramdom
        },
        
        isBridgeOk: function () {
                return !!(window.ncjsbridge || (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.bridgeOk))
        },

        // callback must function
        sendRequest: function (nativeMethod, params, callback) {
                
                var callbackName = ""
                if (typeof callback === "function") {
                        callbackName = this._getCallbackName()
                        this._callbacks[callname] = callbackName
                }

                //android
                if (window.ncjsbridge) {
                        window.ncjsbridge.callMessage(nativeMethod, params, callbackName)
                }
                // ios
                else if (window.webkit) {
                        window.webkit.messageHandlers[nativeMethod].postMessage({
                                body: {
                                        'params': params,
                                        'callback': callbackName
                                }
                        });
                }
        },

        //after sendRequest , if have rsp must call this avoid js memeroy leak
        rspCallBack: function(callbackName, result) {
                var func = this._callbacks[callbackName]
                func(result)
                delete(this._callbacks[callbackName])
        },


}

module.exports = bridge
