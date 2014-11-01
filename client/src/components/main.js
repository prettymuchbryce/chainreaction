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
                <a href="https://github.com/prettymuchbryce/chainreaction"><img className="github-banner" src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"/></a>
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