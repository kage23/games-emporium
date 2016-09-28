var React = require('react');
var Cell = require('../components/Cell');

var CellContainer = React.createClass({
    propTypes: {
        style: React.PropTypes.object.isRequired,
        id: React.PropTypes.string.isRequired,
        handleClick: React.PropTypes.func.isRequired,
        highlighted: React.PropTypes.bool.isRequired,
        occupied: React.PropTypes.number.isRequired
    },

    handleClick: function () {
        this.props.handleClick(this);
    },

    render: function () {
        var newStyles = Object.assign({}, this.props.style);

        if (this.props.highlighted) {
            newStyles.boxShadow = '0px 0px 5px 5px #0f0';
        }

        return (
            <Cell style={newStyles} id={this.props.id} handleClick={this.handleClick} />
        );
    }
});

module.exports = CellContainer;