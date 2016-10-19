import React from 'react'
import { Grid } from 'react-bootstrap'

import GameHeader from '../shared/GameHeader'
import CheckersContainer from './CheckersContainer'

export default class Checkers extends React.Component {
    defaultConfigs = {
        debug: false,                   // set to false to turn console logs off (in a total hacky way and just when I remembered to do it manually)
        boardSize: 8,                   // must be an even number. number of cells along each side of the board. board will be square.
        color: 'green',                  // color of playable squares
        secondaryColor: '#fff',         // color of alternate squares
        defaultPlayerColors: ['red','white'],
        computerDelay: 750,            // number of ms to delay between AI highlights and moves etc
        startingTokens: [
            [
                {position: 'c0r7', king: false}, {position: 'c2r7', king: false}, {position: 'c4r7', king: false}, {position: 'c6r7', king: false},
                {position: 'c1r6', king: false}, {position: 'c3r6', king: false}, {position: 'c5r6', king: false}, {position: 'c7r6', king: false},
                {position: 'c0r5', king: false}, {position: 'c2r5', king: false}, {position: 'c4r5', king: false}, {position: 'c6r5', king: false}
            ],
            [
                {position: 'c1r0', king: false}, {position: 'c3r0', king: false}, {position: 'c5r0', king: false}, {position: 'c7r0', king: false},
                {position: 'c0r1', king: false}, {position: 'c2r1', king: false}, {position: 'c4r1', king: false}, {position: 'c6r1', king: false},
                {position: 'c1r2', king: false}, {position: 'c3r2', king: false}, {position: 'c5r2', king: false}, {position: 'c7r2', king: false}
            ]
        ]
    };

    gameTypes = new Map([
        ['regular', {
            label: 'Regular Checkers',
            description: <p>Just regular-ole checkers.</p>,
            callback () {
                this.setConfig({
                    boardSize: 8,
                    startingTokens: this.defaultConfigs.startingTokens
                });
            }
        }],
        ['anti', {
            label: 'Anti-Checkers',
            description: <p>Instead of losing when you have no valid moves, you win when you have no valid moves.</p>,
            callback () {
                this.setConfig({
                    boardSize: 8,
                    startingTokens: this.defaultConfigs.startingTokens
                });
            }
        }]
    ]);

    state = {
        gameType: 'regular',
        players: [
            {
                name: 'Player 1',
                computer: false,
                color: this.defaultConfigs.defaultPlayerColors[0],
                tokens: [],
                captures: 0
            },
            {
                name: 'Player 2',
                computer: false,
                color: this.defaultConfigs.defaultPlayerColors[1],
                tokens: [],
                captures: 0
            }
        ],
        config: this.defaultConfigs,
        currentTurn: -1,
        selectedToken: '',
        highlightedTokens: [],
        highlightedCells: [],
        continuingAfterJump: false,
        moves: [],
        winner: undefined
    };

    setConfig = (inConfig) => {
        var config = Object.assign({}, this.state.config, inConfig);

        this.setState({config});
    };

    setGameType = (gameType) => {
        this.setState({gameType});

        if (this.gameTypes.get(gameType).callback) {
            this.gameTypes.get(gameType).callback.apply(this);
        }
    };

    newGame = () => {
        var players = this.state.players.map((player, playerIndex) => {
            var tokens = this.state.config.startingTokens[playerIndex].map(token => {
                return {
                    position: token.position,
                    king: token.king,
                    id: playerIndex + '-' + token.position
                };
            });

            return {
                name: player.name,
                computer: player.computer,
                color: player.color,
                captures: player.captures,
                tokens
            };
        });

        this.setState({
            players,
            currentTurn: 0,
            selectedToken: '',
            highlightedCells: [],
            highlightedTokens: [],
            moves: [],
            continuingAfterJump: false,
            winner: undefined
        });

        if (players[0].computer) this.computerTurn();
    };

    newTurn = () => {
        var winner,
            newTurn = this.state.currentTurn + 1;

        if (this.state.config.debug) console.log('Starting turn',newTurn);

        winner = this.determineWinner(newTurn);

        this.setState({
            currentTurn: newTurn,
            selectedToken: '',
            highlightedCells: [],
            highlightedTokens: [],
            continuingAfterJump: false,
            winner
        });

        if (!winner && this.state.players[newTurn % 2].computer) this.computerTurn();
    };

    determineWinner = (currentTurn) => {
        var winner;

        if (this.playerHasNoValidMoves(this.state.players[(currentTurn + 2) % 2])) {
            // Anti-checkers win condition, lose condition otherwise
            if (this.state.gameType === 'anti') winner = this.state.players[(currentTurn + 2) % 2];
            else winner = this.state.players[(currentTurn + 1) % 2];
        }

        return winner;
    };

    computerTurn = () => {
        var executeTurn = () => {
            // Callback 1
            // 1s after the live player completes their turn, we select a move and highlight the token and its valid squares
            var currentPlayer, validMovesForPlayer, selectedMove, validMovesForToken;

            currentPlayer = this.state.players[(this.state.currentTurn + 2) % 2];
            validMovesForPlayer = this.determineValidMovesForPlayer(currentPlayer, this.state.continuingAfterJump ?
                this.getTokenByPosition(this.state.selectedToken) : undefined);
            selectedMove = validMovesForPlayer[Math.floor(Math.random() * validMovesForPlayer.length)];
            // eslint-disable-next-line
            validMovesForToken = validMovesForPlayer.filter(move => {
                if (move.from === selectedMove.from)
                    return true;
            });

            this.setState({
                selectedToken: selectedMove.from
            });

            this.highlightValidMovesForToken(validMovesForToken);

            this.computerTurnTimeout = setTimeout(() => {
                // Callback 2
                // 1s after highlighting the token, we move it
                this.moveToken(selectedMove);
            }, this.state.config.computerDelay); // Callback 2
        };

        if (this.state.continuingAfterJump) executeTurn();
        else this.computerTurnTimeout = setTimeout(executeTurn, this.state.config.computerDelay); // Callback 1
    };

    reset = () => {
        clearTimeout(this.computerTurnTimeout);
        this.setState({currentTurn:-1,winner:false});
    };

    playerHasNoValidMoves = (player) => {
        var moves = this.determineValidMovesForPlayer(player);

        return moves.length <= 0;
    };

    handleTokenClick = (token) => {
        if (this.state.config.debug) console.log('tokenClick!',token.props.position);

        var currentPlayer = this.state.players[(this.state.currentTurn + 2) % 2],
            validMovesForPlayer = this.determineValidMovesForPlayer(currentPlayer),
            validMovesForToken = validMovesForPlayer.filter(move => {
                return token.props.position === move.from;
            });

        if (validMovesForToken.length && ! this.state.continuingAfterJump) {
            this.highlightValidMovesForToken(validMovesForToken);

            if (this.state.config.debug) console.log('Highlighting token',token);

            this.setState({
                selectedToken: token.props.position
            });
        } else if (validMovesForToken.length === 0) {
            this.highlightValidTokens(validMovesForPlayer);

            setTimeout(() => { this.highlightValidTokens([])}, 150);
        }
    };

    highlightValidTokens = (validMoves) => {
        var highlightedTokens = validMoves.map(move => {
            return move.from;
        });

        this.setState({highlightedTokens});
    };

    highlightValidMovesForToken = (validMoves) => {
        var highlightedCells;

        highlightedCells = validMoves.map(move => {
            return move.to;
        });

        if (this.state.config.debug) console.log('Highlighting cells',highlightedCells);

        this.setState({highlightedCells: highlightedCells});
    };

    handleCellClick = (cell) => {
        var move,
            cellIsValid,
            currentPlayer = this.state.players[(this.state.currentTurn + 2) % 2],
            validMovesForPlayer = this.determineValidMovesForPlayer(currentPlayer);

        // Check if the clicked cell is a valid move
        cellIsValid = validMovesForPlayer.reduce((val, move) => {
            if (cell.props.id === move.to) val = true;
            return val;
        }, false);

        if (cellIsValid) {
            if (this.state.config.debug) console.log('Clicked on highlighted cell', cell.props.id);

            // Find the move corresponding to the selected token and cell
            move = validMovesForPlayer.filter(move => {
                return (move.from === this.state.selectedToken && move.to === cell.props.id);
            })[0];

            this.moveToken(move);
        }
    };

    moveToken = (move) => {
        var newTokenIndex, newTokenObject, newPlayerTokensArray, newPlayerObject, jumpedTokenIndex,
            newOpponentTokensArray, newOpponentObject, newPlayersArray, moveToRow, newValidMoves, newMovesArray,
            continueTurn = false, tokenGotKinged = false,
            currentPlayer = this.state.players[(this.state.currentTurn + 2) % 2],
            opponent = this.state.players[(this.state.currentTurn + 1) % 2];

            if (this.state.config.debug) console.log('Moving...',move);

        // Find the correct token object from the player's token array
        currentPlayer.tokens.forEach((token, tokenIndex) => {
            if (token.position === this.state.selectedToken) {
                newTokenIndex = tokenIndex;
            }
        });

        // Create a new token object with the new position
        newTokenObject = Object.assign({}, currentPlayer.tokens[newTokenIndex]);
        newTokenObject.position = move.to;

        // Determine if the token should get kinged
        moveToRow = parseInt(move.to.substr(move.to.indexOf('r') + 1), 10);
        if (((this.state.currentTurn + 2) % 2 === 0 && moveToRow === 0) ||
            ((this.state.currentTurn + 2) % 2 === 1 && moveToRow === this.state.config.boardSize - 1)) {
            newTokenObject.king = true;
            tokenGotKinged = true;
        }

        // Create a new token array with the token in the new position and king status
        newPlayerTokensArray = currentPlayer.tokens;
        newPlayerTokensArray.splice(newTokenIndex, 1, newTokenObject);

        // Create a new player object with the new token array
        newPlayerObject = Object.assign({}, currentPlayer, {tokens: newPlayerTokensArray});

        // If it was a jump, remove the jumped piece from the opponent's tokens array and increase the player's capture count
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

            // Increase the capture count on the new player object
            newPlayerObject.captures = currentPlayer.captures + 1;
        }

        // Create a new players array
        newPlayersArray = new Array(2);
        newPlayersArray[(this.state.currentTurn + 2) % 2] = newPlayerObject;
        newPlayersArray[(this.state.currentTurn + 1) % 2] = move.jump ? newOpponentObject : opponent;

        // Create a new moves array
        newMovesArray = this.state.moves;
        newMovesArray.push(move);

        this.setState({players: newPlayersArray, moves: newMovesArray});

        // If it was a jump, check for more jumps and continue the turn, unless the piece was freshly kinged
        if (move.jump && !tokenGotKinged) {
            newValidMoves = this.determineValidMovesForPlayer(currentPlayer, newTokenObject);
            if (newValidMoves.length && newValidMoves.jumpMoves) {
                continueTurn = true;
                this.highlightValidMovesForToken(newValidMoves);
                this.setState({
                    selectedToken: newTokenObject.position,
                    continuingAfterJump: true
                });

                if (currentPlayer.computer) this.computerTurn();
            }
        }

        if (! continueTurn) this.newTurn();
    };

    isCellOccupied = (col, row) => {
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
    };

    determineValidMovesForPlayer = (player, token) => {
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
    };

    determineValidMovesForToken = (token) => {
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
    };

    updatePlayer = (player, playerIndex) => {
        var players = this.state.players;

        players[playerIndex] = player;

        this.setState({players});
    };

    updateConfig = (config) => {
        this.setState({config});
    };

    getTokenByPosition = (position) => {
        return this.state.players.reduce((prevPlayer, currPlayer) => {
            return currPlayer.tokens.reduce((prevToken, currToken) => {
                if (currToken.position === position) return currToken;
                else return prevToken;
            }, prevPlayer);
        }, false);
    };

    render() {
        return (
            <Grid>
                <GameHeader game="Checkers"
                            gameTypeKey={this.state.gameType}
                            gameTypeObject={this.gameTypes.get(this.state.gameType)}
                />

                <CheckersContainer
                    gameTypes={this.gameTypes}
                    setGameType={this.setGameType}
                    gameState={this.state}
                    newTurn={this.newTurn}
                    newGame={this.newGame}
                    reset={this.reset}
                    handleCellClick={this.handleCellClick}
                    handleTokenClick={this.handleTokenClick}
                    updatePlayer={this.updatePlayer}
                    updateConfig={this.updateConfig}
                    colorToRGB={this.colorToRGB}
                    colorDistance={this.colorDistance}
                    />
            </Grid>
        );
    }
}