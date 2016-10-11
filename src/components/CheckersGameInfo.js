import React from 'react'

export default class CheckersGameInfo extends React.Component {
    constructor() {
        super();

        this.newGame = this.newGame.bind(this);
    }

    newGame(evt) {
        evt.preventDefault();
        this.props.reset();
    }

    render() {
        var currentPlayer = this.props.gameState.players[(this.props.gameState.currentTurn + 2) % 2]

        if (!this.props.gameState.winner) {
            return (
                <div className="gameInfo">
                    <h3>
                        It is <span style={{color:currentPlayer.color}}>{currentPlayer.name}</span>'s turn. <a href="#" onClick={this.newGame}>New game</a>
                    </h3>
                </div>
            );
        } else {
            return (
                <div className="gameInfo">
                    <h3 style={{color:this.props.gameState.winner.color,textTransform:'uppercase'}}>
                        {this.props.gameState.winner.name} WINS!!!! <a href="#" onClick={this.newGame}>New game</a>
                    </h3>
                </div>
            );
        }
    }
}

CheckersGameInfo.propTypes = {
    gameState: React.PropTypes.object.isRequired,
    reset: React.PropTypes.func.isRequired
};
