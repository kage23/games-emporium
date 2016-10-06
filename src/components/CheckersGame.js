var React = require('react'),
    //update = require('react-addons-update'),

    CheckersGameInfo = require('./CheckersGameInfo'),
    CheckersBoard = require('./CheckersBoard'),
    Token = require('./Token'),

    CheckersGame = React.createClass({
        config: {
            debug: false,                   // set to false to turn console logs off (in a total hacky way and just when I remembered to do it manually)
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
                highlightedToken: '',
                highlightedCells: [],
                continuingAfterJump: false
            };
        },

        componentDidMount: function () {
            this.newTurn();
        },

        newTurn: function () {
            var newTurn = this.state.currentTurn + 1;

            if (this.config.debug) console.log('Starting turn',newTurn);

            this.setState({
                currentTurn: newTurn,
                highlightedToken: '',
                highlightedCells: [],
                continuingAfterJump: false
            });
        },

        handleTokenClick: function (token) {
            if (this.config.debug) console.log('tokenClick!',token.props.position);

            var currentPlayer = this.state.players[this.state.currentTurn % 2],
                validMovesForPlayer = this.determineValidMovesForPlayer(currentPlayer),
                validMovesForToken = validMovesForPlayer.filter(function (move) {
                    return token.props.position === move.from;
                });

            if (validMovesForToken.length && ! this.state.continuingAfterJump) {
                this.highlightCells(validMovesForToken);

                if (this.config.debug) console.log('Highlighting token',token);

                this.setState({
                    highlightedToken: token.props.position
                });
            }
        },

        highlightCells: function (validMoves) {
            var highlightedCells = [];

            validMoves.forEach(function (move) {
                highlightedCells.push(move.to);
            });

            if (this.config.debug) console.log('Highlighting cells',highlightedCells);

            this.setState({highlightedCells: highlightedCells});
        },

        handleCellClick: function (cell) {
            var move, newTokenIndex, newTokenObject, newPlayerTokensArray, newPlayerObject,
                jumpedTokenIndex, newOpponentTokensArray, newOpponentObject, newPlayersArray,
                currentPlayer = this.state.players[this.state.currentTurn % 2],
                opponent = this.state.players[(this.state.currentTurn + 1) % 2],
                validMovesForPlayer = this.determineValidMovesForPlayer(currentPlayer),
                newValidMoves, continueTurn = false;

            if (this.state.highlightedCells.indexOf(cell.props.id) > -1) {
                if (this.config.debug) console.log('Clicked on highlighted cell', cell.props.id);

                move = validMovesForPlayer.filter(function (move) {
                    return (move.from === this.state.highlightedToken && move.to === cell.props.id);
                }.bind(this))[0];

                if (this.config.debug) console.log('Moving...',move);

                // Find the correct token object
                currentPlayer.tokens.forEach(function (token, tokenIndex) {
                    if (token.position === this.state.highlightedToken) {
                        newTokenIndex = tokenIndex;
                    }
                }.bind(this));

                // Create a token object with the new position
                newTokenObject = Object.assign({}, currentPlayer.tokens[newTokenIndex]);
                newTokenObject.position = move.to;

                // Create a new token array with the token in the new position
                newPlayerTokensArray = currentPlayer.tokens;
                newPlayerTokensArray.splice(newTokenIndex, 1, newTokenObject);

                // Create a new player object with the new token array
                newPlayerObject = Object.assign({}, currentPlayer, {tokens: newPlayerTokensArray});

                // If it was a jump, remove the jumped piece from the opponent's tokens array
                if (move.jump) {
                    // Find the index
                    opponent.tokens.forEach(function (token, tokenIndex) {
                        if (token.position === move.jump) jumpedTokenIndex = tokenIndex;
                    });

                    // Create a new token array without the jumped piece
                    newOpponentTokensArray = opponent.tokens;
                    newOpponentTokensArray.splice(jumpedTokenIndex, 1);

                    // Create a new player object with the new token array
                    newOpponentObject = Object.assign({}, opponent, {tokens: newOpponentTokensArray});
                }

                // Create a new players array
                newPlayersArray = new Array(2);
                newPlayersArray[this.state.currentTurn % 2] = newPlayerObject;
                newPlayersArray[(this.state.currentTurn + 1) % 2] = move.jump ? newOpponentObject : opponent;

                this.setState({players: newPlayersArray});

                // If it was a jump, check for more jumps and continue the turn
                if (move.jump) {
                    newValidMoves = this.determineValidMovesForPlayer(currentPlayer, newTokenObject);
                    if (newValidMoves.length && newValidMoves.jumpMoves) {
                        continueTurn = true;
                        this.highlightCells(newValidMoves);
                        this.setState({
                            highlightedToken: newTokenObject.position,
                            continuingAfterJump: true
                        });
                    }
                }

                if (! continueTurn) this.newTurn();
            }
        },

        isCellOccupied: function (col, row) {
            var cellIsOccupied = false,
                cellId = 'c' + col + 'r' + row;

            if (this.config.debug) console.log('Checking to see if',col,row,'is occupied or not');

            this.state.players.forEach(function (player, playerIndex) {
                player.tokens.forEach(function (token) {
                    if (this.config.debug) console.log('player',playerIndex,'token',token.id,'token position',token.position);
                    if (token.position === cellId) {
                        cellIsOccupied = playerIndex;
                    }
                }.bind(this));
            }.bind(this));

            if (typeof cellIsOccupied === 'number') {
                if (this.config.debug) console.log(col + ' ' + row + ' is occupied by player ' + cellIsOccupied);
            } else if (typeof cellIsOccupied === 'boolean') {
                if (this.config.debug) console.log(col + ' ' + row + ' is not occupied');
            }

            return cellIsOccupied;
        },

        determineValidMovesForPlayer: function (player, token) {
            var validMovesForPlayer = [], jump = false, filteredValidMovesForPlayer = [];

            if (!token) {
            player.tokens.forEach(function (token) {
                var validMovesForToken = this.determineValidMovesForToken(token);

                if (validMovesForToken) {
                    validMovesForToken.forEach(function (move) {
                        validMovesForPlayer.push(move);
                    });
                }
            }.bind(this));
            } else {
                validMovesForPlayer = this.determineValidMovesForToken(token);
            }

            if (this.config.debug) console.log('player has ', validMovesForPlayer.length, 'valid moves PRE JUMP CHECK');

            validMovesForPlayer.forEach(function (move) {
                if (move.jump) jump = true;
            });

            if (jump) {
                filteredValidMovesForPlayer = validMovesForPlayer.filter(function (move) {
                    return !!move.jump;
                });
                filteredValidMovesForPlayer.jumpMoves = true;

                if (this.config.debug) console.log('its a jump move possibility so now player only has',filteredValidMovesForPlayer.length,'valid moves');
            }

            return jump ? filteredValidMovesForPlayer : validMovesForPlayer;
        },

        determineValidMovesForToken: function (token) {
            var tokenOwner = parseInt(token.id[0], 10),
                currentCol = parseInt(token.position[token.position.indexOf('c') + 1], 10),
                currentRow = parseInt(token.position[token.position.indexOf('r') + 1], 10),
                validCols = [],
                validRows = [],
                validMoves = [];

            if (this.config.debug) console.log('checking valid moves for',token.id);

            if (currentCol - 1 >= 0)
                validCols.push(currentCol - 1);
            if (currentCol + 1 < this.config.boardSize)
                validCols.push(currentCol + 1);

            if ((tokenOwner === 0 || token.king) && currentRow - 1 >= 0)
                validRows.push(currentRow - 1);

            if ((tokenOwner === 1 || token.king) && currentRow + 1 < this.config.boardSize)
                validRows.push(currentRow + 1);

            validCols.forEach(function (col) {
                validRows.forEach(function (row) {
                    var newCol, newRow,
                        cellIsOccupied = this.isCellOccupied(col, row);

                    if (cellIsOccupied === false) {
                        if (this.config.debug) console.log(col,row,'is not occupied; it is valid for',token.id);

                        validMoves.push({
                            from: token.position,
                            to: 'c' + col + 'r' + row
                        });
                    } else if (cellIsOccupied !== tokenOwner) {
                        if (this.config.debug) console.log(col,row,'is occupied by the opponent of',token.id,'check for jump move');

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
                            if (this.config.debug) console.log('can we jump into',newCol,newRow,'?');

                            if (this.isCellOccupied(newCol, newRow) === false) {
                                if (this.config.debug) console.log('jumping into',newCol,newRow,'is a valid move for',token.id);
                                validMoves.push({
                                    from: token.position,
                                    to: 'c' + newCol + 'r' + newRow,
                                    jump: 'c' + col + 'r' + row
                                });
                            }
                        } else {
                            if (this.config.debug) console.log('no suitable space to jump into');
                        }
                    } else {
                        if (this.config.debug) console.log(col,row,'is occupied by the owner of',token.id);
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
                        var highlighted = token.position === this.state.highlightedToken;

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
                        handleCellClick={this.handleCellClick}
                        >
                        {tokens}
                    </CheckersBoard>
                </div>
            );
        }
    });

module.exports = CheckersGame;