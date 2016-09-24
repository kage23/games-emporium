var React = require('react');

function CheckersBoard (props) {
	return (
		<div className="checkersBoard" style={{
				border: '3px solid gold',
				overflow: 'hidden',
				maxWidth: 650,
                position: 'relative'
			}}>
			{props.children}
		</div>
	);
}

module.exports = CheckersBoard;