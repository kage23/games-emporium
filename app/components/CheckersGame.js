var React = require('react');
var SiteHeader = require('../components/SiteHeader');
var GameHeader = require('../components/GameHeader');
var CheckersBoard = require('../components/CheckersBoard');
var TokenContainer = require('../containers/TokenContainer');
var CheckersGameInfoContainer = require('../containers/CheckersGameInfoContainer');
var CellContainer = require('../containers/CellContainer');

var CheckersGame = React.createClass({
    getInitialState: function () {
        return {
            cells: [],
            players: [
                {
                    name: 'Player 1',
                    color: 'red',
                    tokens: [],
                    positions: [
                        'c0r7', 'c2r7', 'c4r7', 'c6r7',
                        'c1r6', 'c3r6', 'c5r6', 'c7r6',
                        'c0r5', 'c2r5', 'c4r5', 'c6r5'
                    ]
                },
                {
                    name: 'Player 2',
                    color: 'black',
                    tokens: [],
                    positions: [
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

    generateBaseCellStyle: function () {
        var cellSize = (100 / this.config.boardSize).toFixed(8) + '%';

        return {
            width: cellSize,
            paddingTop: cellSize,
            position: 'relative',
            float: 'left',
            zIndex: 1
        };
    },

    handleTokenClick: function (tokenContainer) {
        var currentPlayer, tokenBelongsToPlayer, validMoves = [];

        currentPlayer = this.state.players[this.state.currentTurn % 2];

        currentPlayer.tokens.forEach(function (playerToken) {
            if (playerToken.key == tokenContainer.props.startingCell) tokenBelongsToPlayer = true;
        });

        if (tokenBelongsToPlayer) {
            validMoves = this.lookForValidMoves(tokenContainer);
            if (validMoves.length) {
                this.highlightToken(tokenContainer);
                this.setState({
                    cells: this.generateCellArray([], this.config.boardSize, this.generateBaseCellStyle(), this.config.color, this.config.secondaryColor, validMoves)
                });
            }
        }
    },

    handleCellClick: function (cellContainer) {
        var newTurn;

        if (cellContainer.props.highlighted) {
            newTurn = this.state.currentTurn + 1;

            this.moveSelectedTokenToCell(cellContainer.props.id);
            this.resetHighlights();

            this.setState({
                currentTurn: newTurn
            });
        }
    },

    moveSelectedTokenToCell: function (cellId) {
        var currentPlayer = this.state.players[this.state.currentTurn % 2],
            initialPosition = this.state.selectedToken.state.cell,
            positionIndex = currentPlayer.positions.indexOf(initialPosition);

        this.state.selectedToken.setState({cell: cellId});

        currentPlayer.positions[positionIndex] = cellId;
    },

    highlightToken: function (token) {
        if (this.state.selectedToken) {
            this.state.selectedToken.clearHighlight();
        }
        this.setState({selectedToken: token});
        token.highlightToken();
    },

    resetHighlights: function () {
        if (this.state.selectedToken) {
            this.state.selectedToken.clearHighlight();
            this.setState({selectedToken: undefined});
        }

        this.setState({
            cells: this.generateCellArray([], this.config.boardSize, this.generateBaseCellStyle(), this.config.color, this.config.secondaryColor, [])
        });
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
                var id = 'c' + col + 'r' + row;

                var checkCell = function (cell) {
                    var currentTokenLocation = token.state.cell,
                        checkLocation = cell.key,
                        newLocation = 'c',
                        newCell;

                    if (cell.key == id) {
                        if (cell.props.occupied > -1) {
                            if (cell.props.occupied != (this.state.currentTurn % 2)) {
                                if (parseInt(checkLocation[1]) > parseInt(currentTokenLocation[1])) {
                                    newLocation += (parseInt(checkLocation[1]) + 1) + 'r';
                                } else {
                                    newLocation += (parseInt(checkLocation[1]) - 1) + 'r';
                                }

                                if (parseInt(checkLocation[3]) > parseInt(currentTokenLocation[3])) {
                                    newLocation += (parseInt(checkLocation[3]) + 1);
                                } else {
                                    newLocation += (parseInt(checkLocation[3]) - 1);
                                }

                                this.state.cells.forEach(function (cell) {
                                    if (cell.key == newLocation) newCell = cell;
                                });

                                if (newCell) {
                                    id = newLocation;
                                    return checkCell(newCell);
                                }
                            }
                        } else {
                            validCells.push(cell.key);
                        }
                    }
                }.bind(this);

                this.state.cells.forEach(checkCell);
            }.bind(this))
        }.bind(this));

        return validCells;
    },

    generateToken: function (id, player, color, boardSize) {
        return <TokenContainer
            color={color} type="circle" boardSize={boardSize} startingCell={id} key={id}
            owner={player} handleClick={this.handleTokenClick} />
    },

    generateCellArray: function (currentArray, boardSize, inCellStyle, color, secondaryColor, highlightedArray) {
        var id, col, row, backgroundColor, occupied = -1,
            newStyle = Object.assign({}, inCellStyle),
            count = boardSize * boardSize;

        if (currentArray.length >= count) {
            return currentArray;
        } else {
            col = (currentArray.length % boardSize);
            row = Math.floor(currentArray.length / boardSize);
            id = 'c' + col + 'r' + row;

            if (row % 2 != col % 2) {
                backgroundColor = color;
            } else {
                backgroundColor = secondaryColor;
            }

            newStyle.backgroundColor = backgroundColor;

            if (highlightedArray.indexOf(id) > -1) {
                newStyle.boxShadow = '0px 0px 5px 5px #0f0';
                newStyle.zIndex = 2;
            }

            this.state.players.forEach(function (player, playerIndex) {
                if (player.positions.indexOf(id) > -1) {
                    occupied = playerIndex;
                }
            });

            currentArray.push(
                <CellContainer style={newStyle} id={id} key={id} highlighted={highlightedArray.indexOf(id) > -1}
                               occupied={occupied}
                               handleClick={this.handleCellClick} />
            );

            return this.generateCellArray(currentArray, boardSize, inCellStyle, color, secondaryColor, highlightedArray);
        }
    },

    componentDidMount: function () {
        var cellCount = this.config.boardSize * this.config.boardSize;

        var players = [
            Object.assign({}, this.state.players[0]),
            Object.assign({}, this.state.players[1])
        ];

        var newPlayers = players.map(function (currentPlayer, index) {
            var newPlayer = Object.assign({}, currentPlayer);
            newPlayer.tokens = currentPlayer.positions.map(function (currentPosition) {
                return this.generateToken(currentPosition, index, currentPlayer.color, this.config.boardSize);
            }.bind(this));
            return newPlayer;
        }.bind(this));

        var cells = this.generateCellArray([], this.config.boardSize, this.generateBaseCellStyle(), this.config.color, this.config.secondaryColor, []);

        this.setState({
            players: newPlayers,
            cells: cells
        });
    },

    render: function () {
        return (
            <div>
                <SiteHeader />
                <GameHeader game="CHECKERSSSSSSSS" />

                <CheckersGameInfoContainer
                    data={this.state}
                />

                <CheckersBoard>
                    {this.state.cells}
                    {this.state.players[0].tokens}
                    {this.state.players[1].tokens}
                </CheckersBoard>
            </div>
        );
    }
});

module.exports = CheckersGame;