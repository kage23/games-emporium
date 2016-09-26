var React = require('react');
var CheckersBoardContainer = require('../containers/CheckersBoardContainer');
var TokenContainer = require('../containers/TokenContainer');
var SiteHeader = require('../components/SiteHeader');
var GameHeader = require('../components/GameHeader');

var CheckersGame = React.createClass({
    render: function () {
        var boardSize = 8;                  // number of cells along each side of the board. board will be square.
        var color = '#555';                 // color of playable squares
        var secondaryColor = '#fff';        // color of alternate squares
        var player1StartingPositions = [    // array of cell IDs
            'c0r7', 'c2r7', 'c4r7', 'c6r7',
            'c1r6', 'c3r6', 'c5r6', 'c7r6',
            'c0r5', 'c2r5', 'c4r5', 'c6r5'
        ];
        var player2StartingPositions = [    // array of cell IDs
            'c1r0', 'c3r0', 'c5r0', 'c7r0',
            'c0r1', 'c2r1', 'c4r1', 'c6r1',
            'c1r2', 'c3r2', 'c5r2', 'c7r2'
        ];

        function generateTokenFromIdAndColor (id, color) {
            return <TokenContainer color={color} type="circle" boardSize={boardSize} cell={id} key={id} />
        }

        var player1Tokens = player1StartingPositions.map(function (current) {
            return generateTokenFromIdAndColor(current, 'red');
        });

        var player2Tokens = player2StartingPositions.map(function (current) {
            return generateTokenFromIdAndColor(current, 'black');
        });

        return (
            <div>
                <SiteHeader />
                <GameHeader game="CHECKERSSSSSSSS" />

                <CheckersBoardContainer size={boardSize} color={color} secondary_color={secondaryColor}>
                    {player1Tokens}
                    {player2Tokens}
                </CheckersBoardContainer>
            </div>
        );
    }
});

module.exports = CheckersGame;