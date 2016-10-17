import React from 'react'
import { Panel, Button, Row, Col } from 'react-bootstrap'

import PlayerInfoListing from './PlayerInfoListing'

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
        var playerInfoBoxes, moveList;

        playerInfoBoxes = this.props.gameState.players.map((player, playerIndex) => {
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
        });

        moveList = this.props.gameState.moves.map((move, moveIndex) => {
            if (move.jump) return (
                <p key={moveIndex}>From {move.from} to {move.to}, jumping {move.jump}</p>
            );
            else return (
                <p key={moveIndex}>From {move.from} to {move.to}</p>
            );
        });

        return (
            <div className="gameInfo">
                <Button bsStyle="primary" onClick={this.newGame}>New game</Button>
                <Row style={{marginTop:8}}>
                    {playerInfoBoxes}
                </Row>
                <Panel collapsible defaultExpanded={true} header={(<h3>Moves List (click to show/hide)</h3>)}>
                    {moveList}
                </Panel>
            </div>
        );
    }
}