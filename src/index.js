
var Bridge = require("./bridge/bridge")
var App = require("./app/lifecycle")
var Auth = require("./open/authorize/index")
var ENV = require("./open/env/index")

var nchsdk = {
        version: '1.0.0',
        bridge: Bridge,
        app: App,
        auth: Auth,
        env:ENV
}

// dont override global variable
if (typeof window !== 'undefined' && typeof window.nchsdk === 'undefined') {
        window.nchsdk = nchsdk
}

module.exports = nchsdk