var React = require('react');
var TransactionItem = require('./transaction-item.js');

var TransactionList = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    render: function() {
        if (this.state.data.length === 0) {
            return (
                <div>
                    <img className="spinner" src="/building/chainreaction/img/spinner.gif"/>
                </div>
            )
        }

        var transactionNodes = this.state.data.map(function (transaction) {
            return (
                <TransactionItem key={transaction.key} hash={transaction.hash} fees={transaction.fees} 
                amount={transaction.amount} from={transaction.inputs} 
                to={transaction.outputs}/>
            );
        });
        
        return (
            <div>
                {transactionNodes}
            </div>
        )
    }
});

module.exports = TransactionList;