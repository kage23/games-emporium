import React from 'react'
import { Link } from 'react-router'

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
        var winner,
            currentPlayer = this.props.gameState.players[(this.props.gameState.currentTurn + 2) % 2],
            validMoves = this.props.determineValidMovesForPlayer(currentPlayer);

        // TODO: Calculate winner in actual CheckersGame component instead of here
        if (validMoves.length === 0)
            winner = this.props.gameState.players[(this.props.gameState.currentTurn + 1) % 2];

        this.props.gameState.players.forEach((player, playerIndex) => {
            if (player.tokens.length === 0) winner = this.props.gameState.players[(playerIndex + 1) % 2];
        });

        if (!winner) {
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
                    <h3 style={{color:winner.color,textTransform:'uppercase'}}>
                        {winner.name} WINS!!!! <Link to="/">New game</Link>
                    </h3>
                </div>
            );
        }
    }
}

CheckersGameInfo.propTypes = {
    gameState: React.PropTypes.object.isRequired,
    determineValidMovesForPlayer: React.PropTypes.func.isRequired,
    reset: React.PropTypes.func.isRequired
};
