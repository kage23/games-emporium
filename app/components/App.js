var React = require('react');
var CheckersBoard = require('./CheckersBoard');

function App () {
	// this.props.etc
	return (
		<div>
			<h1>KAGE'S UNLICENSED GAME EMPORIUM!!!</h1>
			<h2>WELCOME TO CHECKERSSSSSSSS</h2>

			<CheckersBoard />
		</div>
	);
}

module.exports = App;