var React = require('react');
var SiteHeader = require('../components/SiteHeader');
var GameHeader = require('../components/GameHeader');
var CheckersBoardContainer = require('../containers/CheckersBoardContainer');
var TokenContainer = require('../containers/TokenContainer');
var CheckersGameInfoContainer = require('../containers/CheckersGameInfoContainer');

var CheckersGame = React.createClass({
    getInitialState: function () {
        return {
            players: [
                {
                    name: 'Player 1',
                    color: 'red',
                    tokens: [],
                    startingPositions: [
                        'c0r7', 'c2r7', 'c4r7', 'c6r7',
                        'c1r6', 'c3r6', 'c5r6', 'c7r6',
                        'c0r5', 'c2r5', 'c4r5', 'c6r5'
                    ]
                },
                {
                    name: 'Player 2',
                    color: 'black',
                    tokens: [],
                    startingPositions: [
                        'c1r0', 'c3r0', 'c5r0', 'c7r0',
                        'c0r1', 'c2r1', 'c4r1', 'c6r1',
                        'c1r2', 'c3r2', 'c5r2', 'c7r2'
                    ]
                }
            ],
            currentTurn: 0,
            selectedToken: undefined
        };
    },

    config: {
        boardSize: 8,                   // must be an even number. number of cells along each side of the board. board will be square.
        color: '#555',                  // color of playable squares
        secondaryColor: '#fff'          // color of alternate squares
    },

    handleTokenClick: function (token) {
        var currentPlayer, tokenBelongsToPlayer, validMoves = [];

        currentPlayer = this.state.players[this.state.currentTurn];

        currentPlayer.tokens.forEach(function (playerToken) {
            if (playerToken.key == token.state.cell) tokenBelongsToPlayer = true;
        });

        if (tokenBelongsToPlayer) {
            validMoves = this.lookForValidMoves(token);
            if (validMoves.length) {
                this.highlightToken(token);
                this.highlightCells(validMoves);
            }
        }
    },

    highlightToken: function (token) {
        if (this.state.selectedToken) {
            this.state.selectedToken.clearHighlight();
        }
        this.setState({selectedToken: token});
        token.highlightToken();
    },

    highlightCells: function (cellArray) {
        // debugger;
    },

    lookForValidMoves: function (token) {
        var currentCol = parseInt(token.state.cell[1]),
            currentRow = parseInt(token.state.cell[3]),
            validCols = [],
            validRows = [],
            validCells = [];

        if (currentCol - 1 >= 0)
            validCols.push(currentCol - 1);
        if (currentCol + 1 < this.config.boardSize)
            validCols.push(currentCol + 1);

        if ((token.props.owner == 0 || token.state.king) && currentRow - 1 >= 0)
            validRows.push(currentRow - 1);

        if ((token.props.owner == 1 || token.state.king) && currentRow + 1 < this.config.boardSize)
            validRows.push(currentRow + 1);

        validCols.forEach(function (col) {
            validRows.forEach(function (row) {
                validCells.push('c' + col + 'r' + row);
            })
        });

        return validCells;
    },

    generateToken: function (id, player, color, boardSize) {
        return <TokenContainer
            color={color} type="circle" boardSize={boardSize} startingCell={id} key={id}
            owner={player} handleClick={this.handleTokenClick} />
    },

    componentDidMount: function () {
        var players = [
            Object.assign({}, this.state.players[0]),
            Object.assign({}, this.state.players[1])
        ];

        var newPlayers = players.map(function (currentPlayer, index) {
            var newPlayer = Object.assign({}, currentPlayer);
            newPlayer.tokens = currentPlayer.startingPositions.map(function (currentPosition) {
                return this.generateToken(currentPosition, index, currentPlayer.color, this.config.boardSize);
            }.bind(this));
            return newPlayer;
        }.bind(this));

        this.setState({players: newPlayers});
    },

    render: function () {
        return (
            <div>
                <SiteHeader />
                <GameHeader game="CHECKERSSSSSSSS" />

                <CheckersGameInfoContainer
                    data={this.state}
                />

                <CheckersBoardContainer
                    size={this.config.boardSize}
                    color={this.config.color}
                    secondary_color={this.config.secondaryColor}
                >
                    {this.state.players[0].tokens}
                    {this.state.players[1].tokens}
                </CheckersBoardContainer>
            </div>
        );
    }
});

module.exports = CheckersGame;