var React = require('react');

var TransactionItem = React.createClass({
    render: function() {
        var inputs = this.props.from.map(function (input) {
            return input.addresses[0];
        });

        var outputs = this.props.to.map(function (output) {
            return output.addresses[0];
        });

        var inputs = inputs.join(", ");
        var outputs = outputs.join(", ");

        if (this.props.amount/ 100000000 > 500) {
            this.props.panelType = "btn btn-danger";
        } else if (this.props.amount/ 100000000 > 50) {
            this.props.panelType = "btn btn-warning";
        } else {
            this.props.panelType = "btn btn-success"
        }

        var link = "https://blockchain.info/tx/" + this.props.hash

        var seconds = 0;

        return (
            <a href={link}>
                <button type="button" className={this.props.panelType}>
                    <img className="btc-icon" data-toggle="tooltip" data-placement="left" title="Transaction Amount" src="/building/chainreaction/img/btc-icon.png"/>: {this.props.amount / 100000000}<br/><img className="miner-icon" src="/building/chainreaction/img/miner-icon.png" data-toggle="tooltip" data-placement="left" title="Miners Fee"/>: {this.props.fees / 100000000}
                </button>
            </a>
        )
    }
});

module.exports = TransactionItem;