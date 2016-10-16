import React from 'react'

export default class CheckersGameInfo extends React.Component {
    static propTypes = {
        gameState: React.PropTypes.object.isRequired,
        reset: React.PropTypes.func.isRequired,
        colorToRGB: React.PropTypes.func.isRequired,
        colorDistance: React.PropTypes.func.isRequired
    };

    newGame = (evt) => {
        evt.preventDefault();
        this.props.reset();
    };

    render() {
        var winnerTextStyle, allowedColorDistance = 225, playerKings, playerInfoBoxes, playerTurn, playerTurnOrd,
            currentPlayer = this.props.gameState.players[(this.props.gameState.currentTurn + 2) % 2],
            textStyle = {
                color: currentPlayer.color
            };

        playerTurn = Math.ceil((this.props.gameState.currentTurn + 1) / 2);

        if (playerTurn % 10 === 1 && playerTurn % 100 !== 11) playerTurnOrd = 'st';
        else if (playerTurn % 10 === 2 && playerTurn % 100 !== 12) playerTurnOrd = 'nd';
        else if (playerTurn % 10=== 3 && playerTurn % 100 !== 13) playerTurnOrd = 'rd';
        else playerTurnOrd = 'th';

        if (this.props.colorDistance(
                this.props.colorToRGB(currentPlayer.color), this.props.colorToRGB('white')
            ) < allowedColorDistance) {
            textStyle = {
                color: 'black',
                WebkitTextFillColor: currentPlayer.color,
                WebkitTextStrokeWidth: 1,
                WebkitTextStrokeColor: 'black'
            };
        }

        playerKings = this.props.gameState.players.map(player => {
            return player.tokens.reduce((kingCount, token) => {
                if (token.king) return kingCount + 1;
                else return kingCount;
            }, 0);
        });

        playerInfoBoxes = this.props.gameState.players.map((player, playerIndex) => {
            return (
                <div className="playerScoreBox" key={playerIndex}>
                    <p className="name">{player.name}</p>
                    <p><strong>Total men remaining:</strong> {player.tokens.length}</p>
                    <p><strong>Kings:</strong> {playerKings[playerIndex]}</p>
                    <p><strong>Captures:</strong> {player.captures}</p>
                </div>
            );
        });

        if (!this.props.gameState.winner) {
            return (
                <div className="gameInfo">
                    <h3>
                        It is <span style={textStyle}>{currentPlayer.name}</span>'s {playerTurn + playerTurnOrd} turn. <a href="#" onClick={this.newGame}>New game</a>
                    </h3>
                    {playerInfoBoxes}
                </div>
            );
        } else {
            winnerTextStyle = {
                color: this.props.gameState.winner.color,
                textTransform: 'uppercase'
            };
            if (this.props.colorDistance(
                    this.props.colorToRGB(winnerTextStyle.color), this.props.colorToRGB('white')
                ) < allowedColorDistance) {
                winnerTextStyle = {
                    color: 'black',
                    WebkitTextFillColor: this.props.gameState.winner.color,
                    WebkitTextStrokeWidth: 1,
                    WebkitTextStrokeColor: 'black'
                };
            }
            return (
                <div className="gameInfo">
                    <h3>
                        <span style={winnerTextStyle}>{this.props.gameState.winner.name} Wins!!!!</span> <a href="#" onClick={this.newGame}>New game</a>
                    </h3>
                    {playerInfoBoxes}
                </div>
            );
        }
    }
}