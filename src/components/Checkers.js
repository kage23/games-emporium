import React from 'react'

import GameHeader from './GameHeader'
import CheckersContainer from './CheckersContainer'

var config = {
    debug: false,                   // set to false to turn console logs off (in a total hacky way and just when I remembered to do it manually)
    boardSize: 8,                   // must be an even number. number of cells along each side of the board. board will be square.
    color: '#555',                  // color of playable squares
    secondaryColor: '#fff',         // color of alternate squares
    defaultPlayerColors: ['red','black'],
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
};

export default class Checkers extends React.Component {
    constructor() {
        super();

        this.newGame = this.newGame.bind(this);
        this.newTurn = this.newTurn.bind(this);
        this.reset = this.reset.bind(this);
        this.handleTokenClick = this.handleTokenClick.bind(this);
        this.highlightCells = this.highlightCells.bind(this);
        this.handleCellClick = this.handleCellClick.bind(this);
        this.isCellOccupied = this.isCellOccupied.bind(this);
        this.determineValidMovesForPlayer = this.determineValidMovesForPlayer.bind(this);
        this.determineValidMovesForToken = this.determineValidMovesForToken.bind(this);
        this.updatePlayer = this.updatePlayer.bind(this);

        this.state = {
            players: [
                {
                    name: 'Player 1',
                    color: 'red',
                    tokens: []
                },
                {
                    name: 'Player 2',
                    color: 'black',
                    tokens: []
                }
            ],
            config: config,
            currentTurn: -1,
            highlightedToken: '',
            highlightedCells: [],
            continuingAfterJump: false,
            winner: undefined
        };
    }

    newGame() {
        var players = this.state.players.map((player, playerIndex) => {
            var tokens = this.state.config.startingPositions[playerIndex].map(position => {
                return {
                    position,
                    king: false,
                    id: playerIndex + '-' + position
                };
            });

            return {
                name: player.name,
                color: player.color,
                tokens
            };
        });

        this.setState({
            players,
            currentTurn: 0,
            highlightedToken: '',
            highlightedCells: [],
            continuingAfterJump: false,
            winner: undefined
        });
    }

    newTurn() {
        var winner,
            newTurn = this.state.currentTurn + 1;

        if (this.isPlayerTheLoser(this.state.players[newTurn % 2])) {
            winner = this.state.players[(newTurn + 1) % 2];
        }

        if (this.state.config.debug) console.log('Starting turn',newTurn);

        this.setState({
            currentTurn: newTurn,
            highlightedToken: '',
            highlightedCells: [],
            continuingAfterJump: false,
            winner
        });
    }

    reset() {
        this.setState({currentTurn:-1,winner:false});
    }

    isPlayerTheLoser(player) {
        var moves = this.determineValidMovesForPlayer(player);

        return moves.length <= 0;
    }

    handleTokenClick(token) {
        if (this.state.config.debug) console.log('tokenClick!',token.props.position);

        var currentPlayer = this.state.players[this.state.currentTurn % 2],
            validMovesForPlayer = this.determineValidMovesForPlayer(currentPlayer),
            validMovesForToken = validMovesForPlayer.filter(move => {
                return token.props.position === move.from;
            });

        if (validMovesForToken.length && ! this.state.continuingAfterJump) {
            this.highlightCells(validMovesForToken);

            if (this.state.config.debug) console.log('Highlighting token',token);

            this.setState({
                highlightedToken: token.props.position
            });
        }
    }

    highlightCells(validMoves) {
        var highlightedCells;

        highlightedCells = validMoves.map(move => {
            return move.to;
        });

        if (this.state.config.debug) console.log('Highlighting cells',highlightedCells);

        this.setState({highlightedCells: highlightedCells});
    }

    handleCellClick(cell) {
        var move, newTokenIndex, newTokenObject, newPlayerTokensArray, newPlayerObject, jumpedTokenIndex,
            newOpponentTokensArray, newOpponentObject, newPlayersArray, moveToRow, cellIsValid,
            currentPlayer = this.state.players[this.state.currentTurn % 2],
            opponent = this.state.players[(this.state.currentTurn + 1) % 2],
            validMovesForPlayer = this.determineValidMovesForPlayer(currentPlayer),
            newValidMoves, continueTurn = false;

        // Check if the clicked cell is a valid move
        cellIsValid = validMovesForPlayer.reduce((val, move) => {
            if (cell.props.id === move.to) val = true;
            return val;
        }, false);

        if (cellIsValid) {
            if (this.state.config.debug) console.log('Clicked on highlighted cell', cell.props.id);

            // Find the move corresponding to the selected token and cell
            move = validMovesForPlayer.filter(move => {
                return (move.from === this.state.highlightedToken && move.to === cell.props.id);
            })[0];

            if (this.state.config.debug) console.log('Moving...',move);

            // Find the correct token object from the player's token array
            currentPlayer.tokens.forEach((token, tokenIndex) => {
                if (token.position === this.state.highlightedToken) {
                    newTokenIndex = tokenIndex;
                }
            });

            // Create a new token object with the new position
            newTokenObject = Object.assign({}, currentPlayer.tokens[newTokenIndex]);
            newTokenObject.position = move.to;

            // Determine if the token should get kinged
            moveToRow = parseInt(move.to.substr(move.to.indexOf('r') + 1), 10);
            if ((this.state.currentTurn % 2 === 0 && moveToRow === 0) ||
                (this.state.currentTurn % 2 === 1 && moveToRow === this.state.config.boardSize - 1)) {
                newTokenObject.king = true;
            }

            // Create a new token array with the token in the new position and king status
            newPlayerTokensArray = currentPlayer.tokens;
            newPlayerTokensArray.splice(newTokenIndex, 1, newTokenObject);

            // Create a new player object with the new token array
            newPlayerObject = Object.assign({}, currentPlayer, {tokens: newPlayerTokensArray});

            // If it was a jump, remove the jumped piece from the opponent's tokens array
            if (move.jump) {
                // Find the index of the jumped token
                opponent.tokens.forEach((token, tokenIndex) => {
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
    }

    isCellOccupied(col, row) {
        var cellIsOccupied = false,
            cellId = 'c' + col + 'r' + row;

        if (this.state.config.debug) console.log('Checking to see if',col,row,'is occupied or not');

        this.state.players.forEach((player, playerIndex) => {
            player.tokens.forEach(token => {
                if (this.state.config.debug) console.log('player',playerIndex,'token',token.id,'token position',token.position);
                if (token.position === cellId) {
                    cellIsOccupied = playerIndex;
                }
            });
        });

        if (typeof cellIsOccupied === 'number') {
            if (this.state.config.debug) console.log(col + ' ' + row + ' is occupied by player ' + cellIsOccupied);
        } else if (typeof cellIsOccupied === 'boolean') {
            if (this.state.config.debug) console.log(col + ' ' + row + ' is not occupied');
        }

        return cellIsOccupied;
    }

    determineValidMovesForPlayer(player, token) {
        var validMovesForPlayer = [], jump = false, filteredValidMovesForPlayer = [];

        if (!token) {
            player.tokens.forEach(token => {
                var validMovesForToken = this.determineValidMovesForToken(token);

                if (validMovesForToken) {
                    validMovesForToken.forEach(move => {
                        validMovesForPlayer.push(move);
                    });
                }
            });
        } else {
            validMovesForPlayer = this.determineValidMovesForToken(token);
        }

        if (this.state.config.debug) console.log('player has ', validMovesForPlayer.length, 'valid moves PRE JUMP CHECK');

        validMovesForPlayer.forEach(move => {
            if (move.jump) jump = true;
        });

        if (jump) {
            filteredValidMovesForPlayer = validMovesForPlayer.filter(move => {
                return !!move.jump;
            });
            filteredValidMovesForPlayer.jumpMoves = true;

            if (this.state.config.debug) console.log('its a jump move possibility so now player only has',filteredValidMovesForPlayer.length,'valid moves');
        }

        return jump ? filteredValidMovesForPlayer : validMovesForPlayer;
    }

    determineValidMovesForToken(token) {
        var tokenOwner = parseInt(token.id[0], 10),
            currentCol = parseInt(token.position[token.position.indexOf('c') + 1], 10),
            currentRow = parseInt(token.position[token.position.indexOf('r') + 1], 10),
            validCols = [],
            validRows = [],
            validMoves = [];

        if (this.state.config.debug) console.log('checking valid moves for',token.id);

        if (currentCol - 1 >= 0)
            validCols.push(currentCol - 1);
        if (currentCol + 1 < this.state.config.boardSize)
            validCols.push(currentCol + 1);

        if ((tokenOwner === 0 || token.king) && currentRow - 1 >= 0)
            validRows.push(currentRow - 1);

        if ((tokenOwner === 1 || token.king) && currentRow + 1 < this.state.config.boardSize)
            validRows.push(currentRow + 1);

        validCols.forEach(col => {
            validRows.forEach(row => {
                var newCol, newRow,
                    cellIsOccupied = this.isCellOccupied(col, row);

                if (cellIsOccupied === false) {
                    if (this.state.config.debug) console.log(col,row,'is not occupied; it is valid for',token.id);

                    validMoves.push({
                        from: token.position,
                        to: 'c' + col + 'r' + row
                    });
                } else if (cellIsOccupied !== tokenOwner) {
                    if (this.state.config.debug) console.log(col,row,'is occupied by the opponent of',token.id,'check for jump move');

                    // Cell is occupied by opponent; see if the next space is open for jumping.
                    if (currentCol < col && col + 1 < this.state.config.boardSize)
                        newCol = col + 1;
                    else if (currentCol > col && col - 1 >= 0)
                        newCol = col - 1;

                    if (currentRow < row && row + 1 < this.state.config.boardSize)
                        newRow = row + 1;
                    else if (currentRow > row && row - 1 >= 0)
                        newRow = row - 1;

                    if (typeof newRow !== 'undefined' && typeof newCol !== 'undefined') {
                        if (this.state.config.debug) console.log('can we jump into',newCol,newRow,'?');

                        if (this.isCellOccupied(newCol, newRow) === false) {
                            if (this.state.config.debug) console.log('jumping into',newCol,newRow,'is a valid move for',token.id);

                            validMoves.push({
                                from: token.position,
                                to: 'c' + newCol + 'r' + newRow,
                                jump: 'c' + col + 'r' + row
                            });
                        }
                    } else if (this.state.config.debug) console.log('no suitable space to jump into');
                } else if (this.state.config.debug) console.log(col, row, 'is occupied by the owner of', token.id);
            })
        });

        if (validMoves.length) return validMoves;
        else return [];
    }

    updatePlayer(player, playerIndex) {
        var players = this.state.players;

        players[playerIndex] = player;

        this.setState({players});
    }

    render() {
        return (
            <div>
                <GameHeader game="CHECKERSSSSSSSS" />

                <CheckersContainer
                    gameState={this.state}
                    newTurn={this.newTurn}
                    newGame={this.newGame}
                    reset={this.reset}
                    handleCellClick={this.handleCellClick}
                    handleTokenClick={this.handleTokenClick}
                    updatePlayer={this.updatePlayer}
                    />
            </div>
        );
    }
}