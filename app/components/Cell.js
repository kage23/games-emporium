var React = require('react');

function Cell (props) {
	return <div style={props.style}
				id={props.id}
			></div>;
}

Cell.propTypes = {
	style: React.PropTypes.object.isRequired,
	id: React.PropTypes.string.isRequired
};

module.exports = Cell;