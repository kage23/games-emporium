import React from 'react'
import { Row, Col } from 'react-bootstrap'

import CheckersConfig from './CheckersConfig'
import TurnOrWinnerHeader from '../shared/TurnOrWinnerHeader'
import CheckersGameInfo from './CheckersGameInfo'
import CheckerBoard from '../shared/CheckerBoard'
import Token from '../shared/Token'

export default class CheckersContainer extends React.Component {
    static propTypes = {
        gameTypes: React.PropTypes.object.isRequired,
        setGameType: React.PropTypes.func.isRequired,
        gameState: React.PropTypes.object.isRequired,
        newTurn: React.PropTypes.func.isRequired,
        newGame: React.PropTypes.func.isRequired,
        loadGame: React.PropTypes.func.isRequired,
        backToConfig: React.PropTypes.func.isRequired,
        handleCellClick: React.PropTypes.func.isRequired,
        handleTokenClick: React.PropTypes.func.isRequired,
        updatePlayer: React.PropTypes.func.isRequired,
        updateConfig: React.PropTypes.func.isRequired
    };

    render() {
        var html, tokens,
            generateTokenArray = _generateTokenArray.bind(this);

        tokens = generateTokenArray(this.props.gameState.players);

        if (this.props.gameState.currentTurn < 0)
            html = (
                <CheckersConfig
                    gameTypes={this.props.gameTypes}
                    setGameType={this.props.setGameType}
                    gameState={this.props.gameState}
                    updatePlayer={this.props.updatePlayer}
                    updateConfig={this.props.updateConfig}
                    newGame={this.props.newGame}
                    loadGame={this.props.loadGame}
                    />
            );
        else
            html = (
                <div>
                    <Row>
                        <Col sm={8} lg={7}>
                            <TurnOrWinnerHeader gameState={this.props.gameState}/>
                            <CheckerBoard
                                size={this.props.gameState.config.boardSize}
                                color={this.props.gameState.config.color}
                                secondaryColor={this.props.gameState.config.secondaryColor}
                                highlightedCells={this.props.gameState.highlightedCells}
                                handleCellClick={this.props.handleCellClick}
                                >
                                {tokens}
                            </CheckerBoard>
                        </Col>

                        <Col sm={4} lg={5}>
                            <CheckersGameInfo
                                gameTypes={this.props.gameTypes}
                                gameState={this.props.gameState}
                                backToConfig={this.props.backToConfig}
                                saveGame={this.props.saveGame}
                                />
                        </Col>
                    </Row>
                </div>
            );

        return html;

        function _generateTokenArray(players) {
            var tokenArray = [];

            players.forEach(player => {
                player.tokens.forEach(token => {
                    var highlighted = token.position === this.props.gameState.selectedToken ||
                        this.props.gameState.highlightedTokens.indexOf(token.position) > -1;

                    tokenArray.push((
                        <Token
                            key={token.id}
                            boardSize={this.props.gameState.config.boardSize}
                            type={token.type || 'circle'}
                            color={player.color}
                            handleClick={this.props.handleTokenClick}
                            position={token.position}
                            king={token.king}
                            highlighted={highlighted}
                            />
                    ));
                });
            });

            return tokenArray;
        }
    }
}