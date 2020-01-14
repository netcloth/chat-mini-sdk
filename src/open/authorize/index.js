var Promise = require('promise')
var Bridge = require('../../bridge/bridge')

var auth = {
        _session: "",

        login: function() {
             var promise = new Promise(function (resolve, reject) {
                        
                Bridge.sendRequest()
            
                        
                    });
                    return promise
        }
}

module.exports = auth
