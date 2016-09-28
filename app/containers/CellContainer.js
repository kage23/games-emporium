var React = require('react');
var Cell = require('../components/Cell');

var CellContainer = React.createClass({
    propTypes: {
        style: React.PropTypes.object.isRequired,
        id: React.PropTypes.string.isRequired
    },

    getInitialState: function () {
        return {highlighted: false}
    },

    render: function () {
        var newStyles = Object.assign({}, this.props.style);

        if (this.state.highlighted) {
            newStyles.boxShadow = '0px 0px 5px 5px #0f0';
        }

        return (
            <Cell style={newStyles} id={this.props.id} />
        );
    }
});

module.exports = CellContainer;