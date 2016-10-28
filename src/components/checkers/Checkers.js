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
        }],
        ['crowded', {
            label: 'Crowded Checkers',
            description: <p>Bigger board, more pieces.</p>,
            callback () {
                this.setConfig({
                    boardSize: 10,
                    startingTokens: [
                        [
                            {position: 'c0r9', king: false}, {position: 'c2r9', king: false}, {position: 'c4r9', king: false}, {position: 'c6r9', king: false}, {position: 'c8r9', king: false},
                            {position: 'c1r8', king: false}, {position: 'c3r8', king: false}, {position: 'c5r8', king: false}, {position: 'c7r8', king: false}, {position: 'c9r8', king: false},
                            {position: 'c0r7', king: false}, {position: 'c2r7', king: false}, {position: 'c4r7', king: false}, {position: 'c6r7', king: false}, {position: 'c8r7', king: false},
                            {position: 'c1r6', king: false}, {position: 'c3r6', king: false}, {position: 'c5r6', king: false}, {position: 'c7r6', king: false}, {position: 'c9r6', king: false}
                        ],
                        [
                            {position: 'c1r0', king: false}, {position: 'c3r0', king: false}, {position: 'c5r0', king: false}, {position: 'c7r0', king: false}, {position: 'c9r0', king: false},
                            {position: 'c0r1', king: false}, {position: 'c2r1', king: false}, {position: 'c4r1', king: false}, {position: 'c6r1', king: false}, {position: 'c8r1', king: false},
                            {position: 'c1r2', king: false}, {position: 'c3r2', king: false}, {position: 'c5r2', king: false}, {position: 'c7r2', king: false}, {position: 'c9r2', king: false},
                            {position: 'c0r3', king: false}, {position: 'c2r3', king: false}, {position: 'c4r3', king: false}, {position: 'c6r3', king: false}, {position: 'c8r3', king: false}
                        ]
                    ]
                });
            }
        }],
        ['antiCrowded', {
            label: 'Crowded Anti-Checkers',
            description: <p>Bigger board, more pieces. Try for the anti-win condition though.</p>,
            callback () {
                this.setConfig({
                    boardSize: 10,
                    startingTokens: [
                        [
                            {position: 'c0r9', king: false}, {position: 'c2r9', king: false}, {position: 'c4r9', king: false}, {position: 'c6r9', king: false}, {position: 'c8r9', king: false},
                            {position: 'c1r8', king: false}, {position: 'c3r8', king: false}, {position: 'c5r8', king: false}, {position: 'c7r8', king: false}, {position: 'c9r8', king: false},
                            {position: 'c0r7', king: false}, {position: 'c2r7', king: false}, {position: 'c4r7', king: false}, {position: 'c6r7', king: false}, {position: 'c8r7', king: false},
                            {position: 'c1r6', king: false}, {position: 'c3r6', king: false}, {position: 'c5r6', king: false}, {position: 'c7r6', king: false}, {position: 'c9r6', king: false}
                        ],
                        [
                            {position: 'c1r0', king: false}, {position: 'c3r0', king: false}, {position: 'c5r0', king: false}, {position: 'c7r0', king: false}, {position: 'c9r0', king: false},
                            {position: 'c0r1', king: false}, {position: 'c2r1', king: false}, {position: 'c4r1', king: false}, {position: 'c6r1', king: false}, {position: 'c8r1', king: false},
                            {position: 'c1r2', king: false}, {position: 'c3r2', king: false}, {position: 'c5r2', king: false}, {position: 'c7r2', king: false}, {position: 'c9r2', king: false},
                            {position: 'c0r3', king: false}, {position: 'c2r3', king: false}, {position: 'c4r3', king: false}, {position: 'c6r3', king: false}, {position: 'c8r3', king: false}
                        ]
                    ]
                });
            }
        }],
        ['sparse', {
            label: 'Sparse Checkers',
            description: <p>Bigger board, only a few more pieces.</p>,
            callback () {
                this.setConfig({
                    boardSize: 10,
                    startingTokens: [
                        [
                            {position: 'c0r9', king: false}, {position: 'c2r9', king: false}, {position: 'c4r9', king: false}, {position: 'c6r9', king: false}, {position: 'c8r9', king: false},
                            {position: 'c1r8', king: false}, {position: 'c3r8', king: false}, {position: 'c5r8', king: false}, {position: 'c7r8', king: false}, {position: 'c9r8', king: false},
                            {position: 'c0r7', king: false}, {position: 'c2r7', king: false}, {position: 'c4r7', king: false}, {position: 'c6r7', king: false}, {position: 'c8r7', king: false}
                        ],
                        [
                            {position: 'c1r0', king: false}, {position: 'c3r0', king: false}, {position: 'c5r0', king: false}, {position: 'c7r0', king: false}, {position: 'c9r0', king: false},
                            {position: 'c0r1', king: false}, {position: 'c2r1', king: false}, {position: 'c4r1', king: false}, {position: 'c6r1', king: false}, {position: 'c8r1', king: false},
                            {position: 'c1r2', king: false}, {position: 'c3r2', king: false}, {position: 'c5r2', king: false}, {position: 'c7r2', king: false}, {position: 'c9r2', king: false}
                        ]
                    ]
                });
            }
        }],
        ['antiSparse', {
            label: 'Sparse Anti-Checkers',
            description: <p>Bigger board, only a few more pieces. Try for the anti-win condition though.</p>,
            callback () {
                this.setConfig({
                    boardSize: 10,
                    startingTokens: [
                        [
                            {position: 'c0r9', king: false}, {position: 'c2r9', king: false}, {position: 'c4r9', king: false}, {position: 'c6r9', king: false}, {position: 'c8r9', king: false},
                            {position: 'c1r8', king: false}, {position: 'c3r8', king: false}, {position: 'c5r8', king: false}, {position: 'c7r8', king: false}, {position: 'c9r8', king: false},
                            {position: 'c0r7', king: false}, {position: 'c2r7', king: false}, {position: 'c4r7', king: false}, {position: 'c6r7', king: false}, {position: 'c8r7', king: false}
                        ],
                        [
                            {position: 'c1r0', king: false}, {position: 'c3r0', king: false}, {position: 'c5r0', king: false}, {position: 'c7r0', king: false}, {position: 'c9r0', king: false},
                            {position: 'c0r1', king: false}, {position: 'c2r1', king: false}, {position: 'c4r1', king: false}, {position: 'c6r1', king: false}, {position: 'c8r1', king: false},
                            {position: 'c1r2', king: false}, {position: 'c3r2', king: false}, {position: 'c5r2', king: false}, {position: 'c7r2', king: false}, {position: 'c9r2', king: false}
                        ]
                    ]
                });
            }
        }],
        ['tiny', {
            label: 'Tiny Checkers',
            description: <p>Tiny board!</p>,
            callback () {
                this.setConfig({
                    boardSize: 4,
                    startingTokens: [
                        [{position: 'c0r3', king: false}, {position: 'c2r3', king: false}],
                        [{position: 'c1r0', king: false}, {position: 'c3r0', king: false}]
                    ]
                });
            }
        }],
        ['antiTiny', {
            label: 'Tiny Anti-Checkers',
            description: <p>Tiny board! Try for the anti-win condition though.</p>,
            callback () {
                this.setConfig({
                    boardSize: 4,
                    startingTokens: [
                        [{position: 'c0r3', king: false}, {position: 'c2r3', king: false}],
                        [{position: 'c1r0', king: false}, {position: 'c3r0', king: false}]
                    ]
                });
            }
        }],
        ['mule', {
            label: 'Mule Checkers',
            description: (
                <div>
                    <p>I found this on a website called <a
                        href="https://www.itsyourturn.com/t_helptopic2030.html#helpitem1534">It's Your Turn.</a>
                    </p>
                    <p>Basically, the ones that look like chess knights are the mules. They move, capture, and get
                        captured totally like normal. But they affect how you can win or lose. There are three ways to
                        win:</p>
                    <ul>
                        <li>Capture all of your opponent's regular pieces</li>
                        <li>Lose all of your own mules</li>
                        <li>Force your opponent to king a mule</li>
                    </ul>
                    <p>Thus, there are three ways to lose:</p>
                    <ul>
                        <li>Lose all of your own regular pieces</li>
                        <li>Capture all of your opponent's mules</li>
                        <li>King a mule</li>
                    </ul>
                </div>
            ),
            callback () {
                this.setConfig({
                    boardSize: 8,
                    startingTokens: [
                        [
                            {position: 'c0r7', king: false, type: 'mule'},  {position: 'c2r7', king: false, type: 'mule'},  {position: 'c4r7', king: false, type: 'mule'},  {position: 'c6r7', king: false, type: 'mule'},
                            {position: 'c1r6', king: false},                {position: 'c3r6', king: false},                {position: 'c5r6', king: false},                {position: 'c7r6', king: false},
                            {position: 'c0r5', king: false},                {position: 'c2r5', king: false},                {position: 'c4r5', king: false},                {position: 'c6r5', king: false}
                        ],
                        [
                            {position: 'c1r0', king: false, type: 'mule'},  {position: 'c3r0', king: false, type: 'mule'},  {position: 'c5r0', king: false, type: 'mule'},  {position: 'c7r0', king: false, type: 'mule'},
                            {position: 'c0r1', king: false},                {position: 'c2r1', king: false},                {position: 'c4r1', king: false},                {position: 'c6r1', king: false},
                            {position: 'c1r2', king: false},                {position: 'c3r2', king: false},                {position: 'c5r2', king: false},                {position: 'c7r2', king: false}
                        ]
                    ]
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
        movesHistory: [],
        validMoves: [],
        winner: undefined
    };

    setConfig = (inConfig) => {
        if (this.state.config.debug) console.log('DEBUG: setConfig', inConfig);

        var config = Object.assign({}, this.state.config, inConfig);

        this.setState({config});
    };

    setGameType = (gameType) => {
        if (this.state.config.debug) console.log('DEBUG: setGameType', gameType);

        this.setState({gameType}, applyCallback);

        function applyCallback () {
            if (this.gameTypes.get(gameType).callback) {
                this.gameTypes.get(gameType).callback.apply(this);
            }
        }
    };

    newGame = () => {
        if (this.state.config.debug) console.log('DEBUG: newGame');

        var players = this.state.players.map(this.generatePlayerWithTokens);

        this.setState({
            players,
            currentTurn: -1,
            selectedToken: '',
            highlightedCells: [],
            highlightedTokens: [],
            movesHistory: [],
            continuingAfterJump: false,
            winner: undefined
        }, this.newTurn);
    };

    generatePlayerWithTokens = (player, playerIndex) => {
        var newPlayer = {},
            tokens = this.state.config.startingTokens[playerIndex].map(generateTokenWithId);

        Object.keys(player).forEach(generateNewPlayerItem);

        newPlayer.tokens = tokens;

        return newPlayer;

        function generateNewPlayerItem (key) {
            newPlayer[key] = player[key];
        }

        function generateTokenWithId (token) {
            var returnToken = Object.assign({}, token);
            returnToken.id = playerIndex + '-' + token.position;

            return returnToken;
        }
    };

    loadGame = (saveGameText) => {
        if (this.state.config.debug) console.log('DEBUG: loadGame', saveGameText);

        this.setState(JSON.parse(atob(saveGameText)));
    };

    newTurn = () => {
        var winner,
            validMoves,
            newTurn = this.state.currentTurn + 1,
            newPlayer = this.state.players[newTurn % 2];

        if (this.state.config.debug) console.log('DEBUG: newTurn');

        validMoves = this.determineValidMovesForPlayer(newPlayer);

        winner = this.checkWinLose(newTurn, validMoves);

        this.setState({
            currentTurn: newTurn,
            selectedToken: '',
            highlightedCells: [],
            highlightedTokens: [],
            continuingAfterJump: false,
            winner,
            validMoves
        }, checkComputerTurn);

        function checkComputerTurn () {
            if (!winner && newPlayer.computer) this.computerTurn();
        }
    };

    checkWinLose = (turn, validMoves) => {
        if (this.state.config.debug) console.log('DEBUG: checkWinLose', turn, validMoves);

        var winner,
            playerRegularTokens, playerMules, playerMuleKings,
            opponentRegularTokens, opponentMules, opponentMuleKings,
            player = this.state.players[turn % 2],
            opponent = this.state.players[(turn + 1) % 2];

        if (this.state.gameType === 'mule') {
            playerRegularTokens = player.tokens.filter(filterRegularTokens);
            opponentRegularTokens = opponent.tokens.filter(filterRegularTokens);
            playerMules = player.tokens.filter(filterMules);
            opponentMules = opponent.tokens.filter(filterMules);
            playerMuleKings = playerMules.filter(filterMuleKings);
            opponentMuleKings = opponentMules.filter(filterMuleKings);

            if (opponentRegularTokens.length === 0 || playerMules.length === 0 || opponentMuleKings.length > 0) {
                winner = player;
            } else if (playerRegularTokens.length === 0 || opponentMules.length === 0 || playerMuleKings.length > 0) {
                winner = opponent;
            }
        } else if (validMoves.length <= 0) {
            // Anti-checkers win condition, lose condition otherwise
            if (this.state.gameType.indexOf('anti') === 0) winner = player;
            else winner = opponent;
        }

        return winner;

        function filterRegularTokens (token) {
            return token.type === 'circle' || typeof token.type === 'undefined';
        }

        function filterMules (token) {
            return token.type === 'mule';
        }

        function filterMuleKings (token) {
            return token.type === 'mule' && token.king;
        }
    };

    computerTurn = () => {
        if (this.state.config.debug) console.log('DEBUG: computerTurn');

        var executeTurn = () => {
            // Callback 1
            // 1delay after the live player completes their turn, we select a move and highlight the token and its valid squares
            var selectedMove, validMovesForToken;

            selectedMove = this.state.validMoves[Math.floor(Math.random() * this.state.validMoves.length)];
            // eslint-disable-next-line
            validMovesForToken = this.state.validMoves.filter(move => {
                if (move.from === selectedMove.from)
                    return true;
            });

            this.highlightValidMovesForToken(validMovesForToken);

            this.setState({
                selectedToken: selectedMove.from
            }, setMoveTimeout.bind(this));

            function setMoveTimeout () {
                //noinspection JSPotentiallyInvalidUsageOfThis
                this.computerTurnTimeout = setTimeout(() => {
                    // Callback 2
                    // 1s after highlighting the token, we move it
                    this.moveToken(selectedMove);
                }, this.state.config.computerDelay); // Callback 2
            }
        };

        if (this.state.continuingAfterJump) executeTurn();
        else this.computerTurnTimeout = setTimeout(executeTurn, this.state.config.computerDelay); // Callback 1
    };

    backToConfig = () => {
        var players = this.state.players.map(player => {
            return Object.assign({}, player, {captures: 0});
        });

        if (this.state.config.debug) console.log('DEBUG: backToConfig');

        clearTimeout(this.computerTurnTimeout);
        this.setState({players, currentTurn: -1, winner: false});
    };

    handleTokenClick = (token) => {
        if (this.state.config.debug) console.log('DEBUG: handleTokenClick', token);

        var validMovesForToken = this.state.validMoves.filter(move => {
                return token.props.position === move.from;
            });

        if (!this.state.winner) {
            if (validMovesForToken.length && !this.state.continuingAfterJump) {
                this.highlightValidMovesForToken(validMovesForToken);

                this.setState({
                    selectedToken: token.props.position
                });
            } else if (validMovesForToken.length === 0) {
                this.highlightValidTokens(this.state.validMoves);

                setTimeout(() => {
                    this.highlightValidTokens([])
                }, 150);
            }
        }
    };

    highlightValidTokens = (validMoves) => {
        if (this.state.config.debug) console.log('DEBUG: highlightValidTokens', validMoves);

        var highlightedTokens = validMoves.map(move => {
            return move.from;
        });

        this.setState({highlightedTokens});
    };

    highlightValidMovesForToken = (validMoves) => {
        if (this.state.config.debug) console.log('DEBUG: highlightValidMovesForToken', validMoves);

        var highlightedCells;

        highlightedCells = validMoves.map(move => {
            return move.to;
        });

        this.setState({highlightedCells});
    };

    handleCellClick = (cell) => {
        if (this.state.config.debug) console.log('DEBUG: handleCellClick', cell);

        var move,
            cellIsValid;

        if (this.state.selectedToken) {
            // Check if the clicked cell is a valid move
            cellIsValid = this.state.validMoves.reduce((val, move) => {
                if (cell.props.id === move.to) val = true;
                return val;
            }, false);

            if (cellIsValid) {
                // Find the move corresponding to the selected token and cell
                move = this.state.validMoves.filter(move => {
                    return (move.from === this.state.selectedToken && move.to === cell.props.id);
                })[0];

                this.moveToken(move);
            }
        }
    };

    moveToken = (move) => {
        if (this.state.config.debug) console.log('DEBUG: move', move);

        var newTokenIndex, newTokenObject, newPlayerTokensArray, newPlayerObject, jumpedTokenIndex,
            newOpponentTokensArray, newOpponentObject, newPlayersArray, moveToRow, newValidMoves, newMovesHistoryArray,
            continueTurn = false, tokenGotKinged = false,
            currentPlayer = this.state.players[(this.state.currentTurn + 2) % 2],
            opponent = this.state.players[(this.state.currentTurn + 1) % 2];

        // Find the index of the correct token object from the player's token array
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

        // Create a new movesHistory array
        newMovesHistoryArray = this.state.movesHistory;
        newMovesHistoryArray.push(move);

        this.setState({players: newPlayersArray, movesHistory: newMovesHistoryArray}, checkJumpAndContinue.bind(this));

        function checkJumpAndContinue () {
            // If it was a jump, check for more jumps and continue the turn, unless the piece was freshly kinged
            if (move.jump && !tokenGotKinged) {
                newValidMoves = this.determineValidMovesForPlayer(currentPlayer, newTokenObject);
                if (newValidMoves.length && newValidMoves.jumpMoves) {
                    continueTurn = true;
                    this.highlightValidMovesForToken(newValidMoves);
                    //noinspection JSPotentiallyInvalidUsageOfThis
                    this.setState({
                        selectedToken: newTokenObject.position,
                        continuingAfterJump: true,
                        validMoves: newValidMoves
                    }, checkComputerTurn);

                    function checkComputerTurn () {
                        if (currentPlayer.computer) this.computerTurn();
                    }
                }
            }

            if (!continueTurn) this.newTurn();
        }
    };

    isCellOccupied = (col, row) => {
        if (this.state.config.debug) console.log('DEBUG: isCellOccupied', col, row);

        var cellIsOccupied = false,
            cellId = 'c' + col + 'r' + row;

        this.state.players.forEach((player, playerIndex) => {
            player.tokens.forEach(token => {
                if (token.position === cellId) {
                    cellIsOccupied = playerIndex;
                }
            });
        });

        return cellIsOccupied;
    };

    determineValidMovesForPlayer = (player, token) => {
        if (this.state.config.debug) console.log('DEBUG: determineValidMovesForPlayer', player, token);

        var validMovesForPlayer = [], jumpMovesForPlayer = [];

        if (!token) {
            player.tokens.forEach(token => {
                this.determineValidMovesForToken(token).forEach(move => {
                    validMovesForPlayer.push(move);
                });
            });
        } else {
            validMovesForPlayer = this.determineValidMovesForToken(token);
        }

        jumpMovesForPlayer = validMovesForPlayer.filter(move => {
            return !!move.jump;
        });
        jumpMovesForPlayer.jumpMoves = true;

        return jumpMovesForPlayer.length > 0 ? jumpMovesForPlayer : validMovesForPlayer;
    };

    determineValidMovesForToken = (token) => {
        if (this.state.config.debug) console.log('DEBUG: determineValidMovesForToken', token);

        var tokenOwner = parseInt(token.id[0], 10),
            currentCol = parseInt(token.position[token.position.indexOf('c') + 1], 10),
            currentRow = parseInt(token.position[token.position.indexOf('r') + 1], 10),
            validCols = [],
            validRows = [],
            validMoves = [];

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
                    validMoves.push({
                        from: token.position,
                        to: 'c' + col + 'r' + row
                    });
                } else if (cellIsOccupied !== tokenOwner) {
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
                        if (this.isCellOccupied(newCol, newRow) === false) {
                            validMoves.push({
                                from: token.position,
                                to: 'c' + newCol + 'r' + newRow,
                                jump: 'c' + col + 'r' + row
                            });
                        }
                    }
                }
            })
        });

        return validMoves;
    };

    updatePlayer = (player, playerIndex) => {
        if (this.state.config.debug) console.log('DEBUG: updatePlayer', player, playerIndex);

        var players = this.state.players;

        players[playerIndex] = player;

        this.setState({players});
    };

    updateConfig = (config) => {
        if (this.state.config.debug) console.log('DEBUG: updateConfig', config);

        this.setState({config});
    };

    getTokenByPosition = (position) => {
        if (this.state.config.debug) console.log('DEBUG: getTokenByPosition', position);

        return this.state.players.reduce((prevPlayer, currPlayer) => {
            return currPlayer.tokens.reduce((prevToken, currToken) => {
                if (currToken.position === position) return currToken;
                else return prevToken;
            }, prevPlayer);
        }, false);
    };

    exportStateAsString = () => {
        if (this.state.config.debug) console.log('DEBUG: exportStateAsString');

        return btoa(JSON.stringify(this.state));
    };

    render() {
        return (
            <Grid>
                <GameHeader
                    game="Checkers"
                    gameTypeKey={this.state.gameType}
                    gameTypeObject={this.gameTypes.get(this.state.gameType)}
                    />

                <CheckersContainer
                    gameTypes={this.gameTypes}
                    setGameType={this.setGameType}
                    gameState={this.state}
                    newTurn={this.newTurn}
                    newGame={this.newGame}
                    loadGame={this.loadGame}
                    backToConfig={this.backToConfig}
                    saveGame={this.exportStateAsString}
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