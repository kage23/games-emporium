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
        var winnerTextStyle, allowedColorDistance = 225,
            currentPlayer = this.props.gameState.players[(this.props.gameState.currentTurn + 2) % 2],
            textStyle = {
                color: currentPlayer.color
            };

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

        if (!this.props.gameState.winner) {
            return (
                <div className="gameInfo">
                    <h3>
                        It is <span style={textStyle}>{currentPlayer.name}</span>'s turn. <a href="#" onClick={this.newGame}>New game</a>
                    </h3>
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
                </div>
            );
        }
    }
}