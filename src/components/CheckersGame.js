var React = require('react');

var CheckersBoard = require('./CheckersBoard');

var CheckersGame = React.createClass({
    config: {
        boardSize: 8,                   // must be an even number. number of cells along each side of the board. board will be square.
        color: '#555',                  // color of playable squares
        secondaryColor: '#fff'          // color of alternate squares
    },

    render: function () {
        return (
            <CheckersBoard
                size={this.config.boardSize}
                color={this.config.color}
                secondaryColor={this.config.secondaryColor}
                ></CheckersBoard>
        );
    }
});

module.exports = CheckersGame;