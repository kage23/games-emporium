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
            currentTurn: 0
        };
    },

    config: {
        boardSize: 8,                   // must be an even number. number of cells along each side of the board. board will be square.
        color: '#555',                  // color of playable squares
        secondaryColor: '#fff'          // color of alternate squares
    },

    generateToken: function (id, color, boardSize) {
        return <TokenContainer color={color} type="circle" boardSize={boardSize} cell={id} key={id} />
    },

    componentDidMount: function () {
        var players = [
            Object.assign({}, this.state.players[0]),
            Object.assign({}, this.state.players[1])
        ];

        var newPlayers = players.map(function (currentPlayer) {
            var newPlayer = Object.assign({}, currentPlayer);
            newPlayer.tokens = currentPlayer.startingPositions.map(function (currentPosition) {
                return this.generateToken(currentPosition, currentPlayer.color, this.config.boardSize);
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