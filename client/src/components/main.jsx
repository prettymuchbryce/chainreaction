var React = require('react');
var TransactionList = require('./transaction-list.jsx');
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
                <a href="https://github.com/prettymuchbryce/chainreaction"><img className="github-banner" src="http://aral.github.com/fork-me-on-github-retina-ribbons/right-graphite@2x.png" alt="Fork me on GitHub"/></a>
                <div className="col-md-12 text-center">
                    <h3>Realtime transactions on the BTC Network</h3>
                    <div className="panel panel-default">
                        <button type="button" className="btn btn-success">{'<50 BTC'}</button>
                        <button type="button" className="btn btn-warning">{'>=50 BTC'}</button>
                        <button type="button" className="btn btn-danger">{'>=500 BTC'}</button>
                        <br/><br/>
                        <img className="btc-icon" data-toggle="tooltip" data-placement="left" title="Transaction Amount" src="/building/chainreaction/img/btc-icon.png"/>: Amount &nbsp;&nbsp;&nbsp;<img className="miner-icon" src="/building/chainreaction/img/miner-icon.png" data-toggle="tooltip" data-placement="left" title="Miners Fee"/>: Miners Fee
                        <br/>

                        <small>Click any transaction below to see more info on blockchain.info</small>
                    </div>
                    <TransactionList ref="list"/>
                </div>
            </div>
        )
    }
});

module.exports = Main;