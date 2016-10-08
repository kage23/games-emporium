import React from 'react'

import CheckersConfig from './CheckersConfig'
import CheckersGameInfo from './CheckersGameInfo'
import CheckersBoard from './CheckersBoard'
import Token from './Token'

export default class CheckersContainer extends React.Component {
    render() {
        var html, tokens;

        var generateTokenArray = function (players) {
            var tokenArray = [];

            players.forEach(player => {
                player.tokens.forEach(token => {
                    var highlighted = token.position === this.props.gameState.highlightedToken;

                    tokenArray.push((
                        <Token boardSize={this.props.gameState.config.boardSize} type='circle' color={player.color}
                               handleClick={this.props.handleTokenClick} position={token.position} key={token.id}
                               king={token.king} highlighted={highlighted}
                            />
                    ));
                });
            });

            return tokenArray;
        }.bind(this);

        tokens = generateTokenArray(this.props.gameState.players);

        if (this.props.gameState.currentTurn < 0)
            html = (
                <CheckersConfig
                    gameState={this.props.gameState}
                    updatePlayer={this.props.updatePlayer}
                    newGame={this.props.newGame}
                    />
            );
        else
            html = (
                <div>
                    <CheckersGameInfo
                        gameState={this.props.gameState}
                        determineValidMovesForPlayer={this.props.determineValidMovesForPlayer}
                        reset={this.props.reset}
                        />

                    <CheckersBoard
                        size={this.props.gameState.config.boardSize}
                        color={this.props.gameState.config.color}
                        secondaryColor={this.props.gameState.config.secondaryColor}
                        highlightedCells={this.props.gameState.highlightedCells}
                        handleCellClick={this.props.handleCellClick}
                        >
                        {tokens}
                    </CheckersBoard>
                </div>
            );

        return html;
    }
}

CheckersContainer.propTypes = {
    gameState: React.PropTypes.object.isRequired,
    newTurn: React.PropTypes.func.isRequired,
    newGame: React.PropTypes.func.isRequired,
    reset: React.PropTypes.func.isRequired,
    determineValidMovesForPlayer: React.PropTypes.func.isRequired,
    handleCellClick: React.PropTypes.func.isRequired,
    handleTokenClick: React.PropTypes.func.isRequired,
    updatePlayer: React.PropTypes.func.isRequired
};