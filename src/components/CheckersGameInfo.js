import React from 'react'
import { Link } from 'react-router'

export default class CheckersGameInfo extends React.Component {
    handleClick(evt) {
        evt.preventDefault();

        this.props.newTurn();
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
                        It is <span style={{color:currentPlayer.color}}>{currentPlayer.name}</span>'s turn. <Link to="/">New game</Link>
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
    newTurn: React.PropTypes.func.isRequired
};
