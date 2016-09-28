var React = require('react');

var Cell = React.createClass({
    render: function () {
        return <div style={this.props.style}
                    id={this.props.id}
                    onClick={this.props.handleClick}
        ></div>;
    }
});

Cell.propTypes = {
	style: React.PropTypes.object.isRequired,
	id: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func.isRequired
};

module.exports = Cell;