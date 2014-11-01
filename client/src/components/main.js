var React = require('react');
var TransactionList = require('./transaction-list.js');
var React = require('react');
var Network = require('../network.js');

var Main = React.createClass({
    componentDidMount: function() { 
        var transactions = [];
        var self = this;
        var i = 0;
        Network.addEventListener(function(event) {
            if (event.payload.block_chain === 'bitcoin') {
                i++;
                event.payload.transaction.key = i;
                if (transactions.length > 100) {
                    transactions.pop();
                }
                transactions.unshift(event.payload.transaction);
                self.refs.list.replaceState({ data: transactions });
            }
        });
    },
    render: function() {
        return (
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3>New Transactions on the BTC Network</h3>
                    <button type="button" className="btn btn-success">{'<100 BTC'}</button>
                    <button type="button" className="btn btn-warning">{'>=100 BTC'}</button>
                    <button type="button" className="btn btn-danger">{'>=1000 BTC'}</button>
                    <br/>
                    <small>Click any transaction below to see more info on blockchain.info</small>
                    <TransactionList ref="list"/>
                </div>
            </div>
        )
    }
});

module.exports = Main;