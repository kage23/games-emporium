import React from 'react'

import PlayerNameSpan from './PlayerNameSpan'
import NumberWithOrd from './NumberWithOrd'

export default class TurnOrWinnerHeader extends React.Component {
    static propTypes = {
        gameState: React.PropTypes.object.isRequired
    };

    render() {
        var html,
            currentPlayer = this.props.gameState.players[(this.props.gameState.currentTurn + 2) % 2],
            playerTurn = Math.ceil((this.props.gameState.currentTurn + 1) / 2);

        if (!this.props.gameState.winner) {
            html = (
                <h4>
                    It is <PlayerNameSpan player={currentPlayer} />'s <NumberWithOrd number={playerTurn} /> turn.
                </h4>
            );
        } else {
            html = (
                <h4>
                    <PlayerNameSpan player={this.props.gameState.winner} /> wins!!!
                </h4>
            );
        }

        return html;
    }
}