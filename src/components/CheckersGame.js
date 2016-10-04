var React = require('react'),
    update = require('react-addons-update'),

    CheckersGameInfo = require('./CheckersGameInfo'),
    CheckersBoard = require('./CheckersBoard'),
    Token = require('./Token'),

    CheckersGame = React.createClass({
        config: {
            boardSize: 8,                   // must be an even number. number of cells along each side of the board. board will be square.
            color: '#555',                  // color of playable squares
            secondaryColor: '#fff',         // color of alternate squares
            startingPositions: [
                [
                    'c0r7', 'c2r7', 'c4r7', 'c6r7',
                    'c1r6', 'c3r6', 'c5r6', 'c7r6',
                    'c0r5', 'c2r5', 'c4r5', 'c6r5'
                ],
                [
                    'c1r0', 'c3r0', 'c5r0', 'c7r0',
                    'c0r1', 'c2r1', 'c4r1', 'c6r1',
                    'c1r2', 'c3r2', 'c5r2', 'c7r2'
                ]
            ]
        },

        getInitialState: function () {
            var players;

            players = this.config.startingPositions.map(function (positions, playerIndex) {
                var name, color, tokens;

                // Name and color hard-coded for now
                if (playerIndex === 0) {
                    name = 'Player 1';
                    color = 'red';
                } else if (playerIndex === 1) {
                    name = 'Player 2';
                    color = 'black';
                }

                tokens = positions.map(function (position) {
                    return {
                        position: position,
                        king: false,
                        id: playerIndex + '-' + position
                    };
                });

                return {
                    name: name,
                    color: color,
                    tokens: tokens
                };
            });

            return {
                players: players,
                currentTurn: 0,
                validMoves: []
            };
        },

        componentDidMount: function () {
            var validMoves = this.determineValidMovesForPlayer(this.state.players[0]);

            this.setState({validMoves:validMoves});
        },

        handleTokenClick: function (token) {
            var currentPlayer, tokenBelongsToPlayer;

            currentPlayer = this.state.players[this.state.currentTurn % 2];

            currentPlayer.tokens.forEach(function (currentToken) {
                if (currentToken.position === token.props.position) tokenBelongsToPlayer = true;
            });

            if (tokenBelongsToPlayer) {
                // Determine and highlight valid moves
                debugger;
            }
        },

        determineValidMovesForPlayer: function (player) {
            var validMovesForPlayer = [];

            // TODO: So far there's no concept of a jump. Eventually, we need to implement the rule that if a jump is possible, it's REQUIRED.
            player.tokens.forEach(function (token) {
                var validMovesForToken = this.determineValidMovesForToken(token);

                if (validMovesForToken) {
                    validMovesForToken.forEach(function (move) {
                        validMovesForPlayer.push(move);
                    });
                }
            }.bind(this));

            return validMovesForPlayer;
        },

        determineValidMovesForToken: function (token) {
            var currentCol = parseInt(token.position[1]),
                currentRow = parseInt(token.position[3]),
                validCols = [],
                validRows = [],
                validMoves = [];

            if (currentCol - 1 >= 0)
                validCols.push(currentCol - 1);
            if (currentCol + 1 < this.config.boardSize)
                validCols.push(currentCol + 1);

            if ((parseInt(token.id[0]) == 0 || token.king) && currentRow - 1 >= 0)
                validRows.push(currentRow - 1);

            if ((parseInt(token.id[0]) == 1 || token.king) && currentRow + 1 < this.config.boardSize)
                validRows.push(currentRow + 1);


            validCols.forEach(function (col) {
                validRows.forEach(function (row) {
                    var cellIsValid = true,
                        id = 'c' + col + 'r' + row;


                    this.state.players.forEach(function (player) {
                        player.tokens.forEach(function (token) {
                            if (token.position === id) {
                                // TODO: This needs to check if the cell is occupied by the current player or the opponent, and act accordingly
                                cellIsValid = false;
                            }
                        }.bind(this));
                    }.bind(this));


                    if (cellIsValid) {
                        validMoves.push(token.position + '-' + id);
                    }

                    //var checkCell = function (cell) {
                    //    var currentTokenLocation = token.state.cell,
                    //        checkLocation = cell.key,
                    //        newLocation = 'c',
                    //        newCell;
                    //
                    //    if (cell.key == id) {
                    //        if (cell.props.occupied > -1) {
                    //            if (cell.props.occupied != (this.state.currentTurn % 2)) {
                    //                if (parseInt(checkLocation[1]) > parseInt(currentTokenLocation[1])) {
                    //                    newLocation += (parseInt(checkLocation[1]) + 1) + 'r';
                    //                } else {
                    //                    newLocation += (parseInt(checkLocation[1]) - 1) + 'r';
                    //                }
                    //
                    //                if (parseInt(checkLocation[3]) > parseInt(currentTokenLocation[3])) {
                    //                    newLocation += (parseInt(checkLocation[3]) + 1);
                    //                } else {
                    //                    newLocation += (parseInt(checkLocation[3]) - 1);
                    //                }
                    //
                    //                this.state.cells.forEach(function (cell) {
                    //                    if (cell.key == newLocation) newCell = cell;
                    //                });
                    //
                    //                if (newCell) {
                    //                    id = newLocation;
                    //                    return checkCell(newCell);
                    //                }
                    //            }
                    //        } else {
                    //            validCells.push(cell.key);
                    //        }
                    //    }
                    //}.bind(this);

                    //this.state.cells.forEach(checkCell);
                }.bind(this))
            }.bind(this));

            if (validMoves.length) return validMoves;
        },

        render: function () {
            var tokens;

            var generateTokenArray = function generateTokenArray (players) {
                var tokenArray = [];

                players.forEach(function (player) {
                    player.tokens.forEach(function (token) {
                        tokenArray.push((
                            <Token boardSize={this.config.boardSize} type='circle' color={player.color}
                                   handleClick={this.handleTokenClick} position={token.position} key={token.id}
                                   king={token.king}
                                />
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