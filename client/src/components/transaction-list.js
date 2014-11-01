var React = require('react');
var TransactionItem = require('./transaction-item.js');

var TransactionList = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    render: function() {
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