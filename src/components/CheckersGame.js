var React = require('react'),

    CheckersGameInfo = require('./CheckersGameInfo'),
    CheckersBoard = require('./CheckersBoard'),
    Token = require('./Token'),

    CheckersGame = React.createClass({
        config: {
            boardSize: 8,                   // must be an even number. number of cells along each side of the board. board will be square.
            color: '#555',                  // color of playable squares
            secondaryColor: '#fff',         // color of alternate squares
            player1StartingPositions: [     // Array of cell IDs
                'c0r7', 'c2r7', 'c4r7', 'c6r7',
                'c1r6', 'c3r6', 'c5r6', 'c7r6',
                'c0r5', 'c2r5', 'c4r5', 'c6r5'
            ],
            player2StartingPositions: [     // Array of cell IDs
                'c1r0', 'c3r0', 'c5r0', 'c7r0',
                'c0r1', 'c2r1', 'c4r1', 'c6r1',
                'c1r2', 'c3r2', 'c5r2', 'c7r2'
            ]
        },

        getInitialState: function () {
            return {
                players: [
                    {
                        name: 'Player 1',
                        color: 'red',
                        positions: this.config.player1StartingPositions
                    },
                    {
                        name: 'Player 2',
                        color: 'black',
                        positions: this.config.player2StartingPositions
                    }
                ],
                currentTurn: 0
            };
        },

        render: function () {
            var tokens;

            var generateTokenArray = function generateTokenArray (players) {
                var tokenArray = [];

                players.forEach(function (player) {
                    player.positions.forEach(function (position) {
                        tokenArray.push((
                            <Token boardSize={this.config.boardSize} type='circle' color={player.color}
                                   position={position} key={position} />
                        ));
                    }.bind(this));
                }.bind(this));

                return tokenArray;
            }.bind(this);

            tokens = generateTokenArray(this.state.players);

            return (
                <div>
                    <CheckersGameInfo
                        gameState={this.state}
                        />

                    <CheckersBoard
                        size={this.config.boardSize}
                        color={this.config.color}
                        secondaryColor={this.config.secondaryColor}
                        >
                        {tokens}
                    </CheckersBoard>
                </div>
            );
        }
    });

module.exports = CheckersGame;