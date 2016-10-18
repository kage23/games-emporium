import React from 'react'
import { Button, Row, Col } from 'react-bootstrap'

import PlayerInfoListing from '../shared/PlayerInfoListing'
import MovesListPanel from '../shared/MovesListPanel'

export default class CheckersGameInfo extends React.Component {
    static propTypes = {
        gameState: React.PropTypes.object.isRequired,
        reset: React.PropTypes.func.isRequired
    };

    newGame = (evt) => {
        evt.preventDefault();
        this.props.reset();
    };

    render() {
        var generatePlayerInfoBox = (player, playerIndex) => {
            return (
                <Col lg={6} key={playerIndex}>
                    <PlayerInfoListing playerName={player.name} dataListing={[
                        {
                            label: 'Total men remaining',
                            value: player.tokens.length
                        },
                        {
                            label: 'Kings',
                            value: player.tokens.filter(token => {return token.king;}).length
                        },
                        {
                            label: 'Captures',
                            value: player.captures
                        }
                    ]}
                        />
                </Col>
            );
        };

        return (
            <div className="gameInfo">
                <Button bsStyle="primary" onClick={this.newGame}>New game</Button>
                <Row style={{marginTop:8}}>
                    {this.props.gameState.players.map(generatePlayerInfoBox)}
                </Row>
                <MovesListPanel moves={this.props.gameState.moves} />
            </div>
        );
    }
}