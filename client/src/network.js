var _ = require('underscore');

var Network = function() {
    var callbacks = [];
    var conn = new WebSocket("wss://ws.chain.com/v2/notifications");

    conn.onopen = function (event) {
        var req = {type: "new-transaction", block_chain: "bitcoin"};
        conn.send(JSON.stringify(req));
    };

    conn.onmessage = function (event) {
        var parsedEvent = JSON.parse(event.data);
        _.each(callbacks, function(callback) {
            callback(parsedEvent);
        });
    };

    this.addEventListener = function(cb) { 
        callbacks.push(cb);
    }
}

module.exports = new Network();