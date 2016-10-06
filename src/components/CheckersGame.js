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
                currentTurn: -1,
                validMoves: [],
                highlightedToken: undefined,
                highlightedCells: []
            };
        },

        componentDidMount: function () {
            this.newTurn();
        },

        newTurn: function () {
            var newTurn = this.state.currentTurn + 1,
                newPlayer = this.state.players[newTurn % 2],
                newValidMoves = this.determineValidMovesForPlayer(newPlayer);

            this.setState({
                currentTurn: newTurn,
                validMoves: newValidMoves,
                highlightedToken: undefined,
                highlightedCells: []
            });
        },

        handleTokenClick: function (token) {
            var newHighlightedCells = [],
                validMovesForToken = this.state.validMoves.filter(function (move) {
                return token.props.position === move.from;
            });

            if (validMovesForToken.length) {
                validMovesForToken.forEach(function (move) {
                    newHighlightedCells.push(move.to);
                });

                this.setState({
                    highlightedToken: token,
                    highlightedCells: newHighlightedCells
                });
            }
        },

        handleCellClick: function (cell) {
            // TODO: handleCellClick
        },

        isCellOccupied: function (col, row) {
            var currentPlayer = this.state.players[this.state.currentTurn % 2] || this.state.players[0],
                cellIsOccupied = false,
                cellId = 'c' + col + 'r' + row;

            this.state.players.forEach(function (player, playerIndex) {
                player.tokens.forEach(function (token) {
                    if (token.position === cellId) {
                        if (currentPlayer === this.state.players[playerIndex]) {
                            cellIsOccupied = 'player';
                        } else {
                            cellIsOccupied = 'opponent';
                        }
                    }
                }.bind(this));
            }.bind(this));

            return cellIsOccupied;
        },

        determineValidMovesForPlayer: function (player) {
            var validMovesForPlayer = [], jump = false, filteredValidMovesForPlayer = [];

            player.tokens.forEach(function (token) {
                var validMovesForToken = this.determineValidMovesForToken(token);

                if (validMovesForToken) {
                    validMovesForToken.forEach(function (move) {
                        validMovesForPlayer.push(move);
                        if (move.jump) jump = true;
                    });
                }
            }.bind(this));

            if (jump) {
                filteredValidMovesForPlayer = validMovesForPlayer.filter(function (move) {
                    return !!move.jump;
                });
                filteredValidMovesForPlayer.jumpMoves = true;
            }

            return jump ? filteredValidMovesForPlayer : validMovesForPlayer;
        },

        determineValidMovesForToken: function (token) {
            var tokenOwner = parseInt(token.id[0]),
                currentCol = parseInt(token.position[token.position.indexOf('c') + 1]),
                currentRow = parseInt(token.position[token.position.indexOf('r') + 1]),
                validCols = [],
                validRows = [],
                validMoves = [];

            if (currentCol - 1 >= 0)
                validCols.push(currentCol - 1);
            if (currentCol + 1 < this.config.boardSize)
                validCols.push(currentCol + 1);

            if ((tokenOwner == 0 || token.king) && currentRow - 1 >= 0)
                validRows.push(currentRow - 1);

            if ((tokenOwner == 1 || token.king) && currentRow + 1 < this.config.boardSize)
                validRows.push(currentRow + 1);


            validCols.forEach(function (col) {
                validRows.forEach(function (row) {
                    var newCol, newRow,
                        cellIsOccupied = this.isCellOccupied(col, row);

                    if (!cellIsOccupied) {
                        validMoves.push({
                            from: token.position,
                            to: 'c' + col + 'r' + row
                        });
                    } else if (cellIsOccupied === 'opponent') {
                        // Cell is occupied by opponent; see if the next space is open for jumping.
                        if (currentCol < col && col + 1 < this.config.boardSize) {
                            newCol = col + 1;
                        } else if (currentCol > col && col - 1 >= 0) {
                            newCol = col - 1;
                        }

                        if (currentRow < row && row + 1 < this.config.boardSize) {
                            newRow = row + 1;
                        } else if (currentRow > row && row - 1 >= 0) {
                            newRow = row - 1;
                        }

                        if (typeof newRow !== 'undefined' && typeof newCol !== 'undefined') {
                            if (! this.isCellOccupied(newCol, newRow)) {
                                validMoves.push({
                                    from: token.position,
                                    to: 'c' + newCol + 'r' + newRow,
                                    jump: 'c' + col + 'r' + row
                                });
                            }
                        }
                    }
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
                        var highlighted = typeof this.state.highlightedToken !== 'undefined' &&
                            token.position === this.state.highlightedToken.props.position;

                        tokenArray.push((
                            <Token boardSize={this.config.boardSize} type='circle' color={player.color}
                                   handleClick={this.handleTokenClick} position={token.position} key={token.id}
                                   king={token.king} highlighted={highlighted}
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
                        highlightedCells={this.state.highlightedCells}
                        >
                        {tokens}
                    </CheckersBoard>
                </div>
            );
        }
    });

module.exports = CheckersGame;