
var Bridge = require("./bridge/bridge")
var App = require("./app/lifecycle")

var ncsdk = {
        version: '1.0.0',
        bridge: Bridge,
        app: App,
}

// dont override global variable
if (typeof window !== 'undefined' && typeof window.ncsdk === 'undefined') {
        window.ncsdk = ncsdk
}

module.exports = ncsdk