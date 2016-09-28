var React = require('react');

var Cell = React.createClass({
    render: function () {
        return <div style={this.props.style}
                    id={this.props.id}
        ></div>;
    }
});

Cell.propTypes = {
	style: React.PropTypes.object.isRequired,
	id: React.PropTypes.string.isRequired
};

module.exports = Cell;