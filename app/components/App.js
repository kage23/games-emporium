var React = require('react');
var CheckersBoardContainer = require('../containers/CheckersBoardContainer');

function App () {
	return (
		<div>
			<h1>KAGE'S UNLICENSED GAME EMPORIUM!!!</h1>
			<h2>WELCOME TO CHECKERSSSSSSSS</h2>

			<CheckersBoardContainer size={8} color='#333' secondary_color='#fff' />
		</div>
	);
}

module.exports = App;