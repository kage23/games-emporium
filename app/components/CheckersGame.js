var React = require('react');
var CheckersBoardContainer = require('../containers/CheckersBoardContainer');
var TokenContainer = require('../containers/TokenContainer');

function CheckersGame () {
    var boardSize = 8;              // number of cells along each side of the board. board will be square.
    var color = '#fff';             // color of top-left square
    var secondaryColor = '#555';    // color of alternate squares

	return (
		<div>
			<h1>KAGE'S UNLICENSED GAME EMPORIUM!!!</h1>
			<h2>WELCOME TO CHECKERSSSSSSSS</h2>

			<CheckersBoardContainer size={boardSize} color={color} secondary_color={secondaryColor}>
                <TokenContainer color="black" type="circle" boardSize={boardSize} cell="c3r2" />
                <TokenContainer color="red" type="circle" boardSize={boardSize} cell="c0r7" />
            </CheckersBoardContainer>
		</div>
	);
}

module.exports = CheckersGame;