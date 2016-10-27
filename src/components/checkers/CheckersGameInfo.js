import React from 'react'
import { ButtonToolbar, Button, Row, Col } from 'react-bootstrap'

import PlayerInfoListing from '../shared/PlayerInfoListing'
import MovesListPanel from '../shared/MovesListPanel'
import ModalSaveGame from '../shared/ModalSaveGame'

export default class CheckersGameInfo extends React.Component {
    static propTypes = {
        gameState: React.PropTypes.object.isRequired,
        reset: React.PropTypes.func.isRequired,
        saveGame: React.PropTypes.func.isRequired
    };

    state = {
        showSaveModal: false
    };

    newGame = (evt) => {
        evt.preventDefault();
        this.props.reset();
    };

    saveGame = (evt) => {
        evt.preventDefault();

        this.setState({ showSaveModal: true });
    };

    closeSaveModal = (evt) => {
        evt.preventDefault();

        this.setState({ showSaveModal: false });
    };

    render() {
        var generatePlayerInfoBox = (player, playerIndex) => {
            return (
                <Col lg={6} key={playerIndex}>
                    <PlayerInfoListing player={player} dataListing={[
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
                <Row>
                    <Col xs={12}>
                        <ButtonToolbar>
                            <Button bsStyle="primary" className="pull-right" onClick={this.newGame}>
                                {this.props.gameState.winner ? 'New' : 'Abandon'} game
                            </Button>
                            <Button bsStyle="primary" className="pull-right" onClick={this.saveGame}>Save game</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
                <Row style={{marginTop:8}}>
                    {this.props.gameState.players.map(generatePlayerInfoBox)}
                </Row>
                <MovesListPanel moves={this.props.gameState.movesHistory} />

                <ModalSaveGame showModal={this.state.showSaveModal}
                               saveGameText={this.props.saveGame()}
                               closeModal={this.closeSaveModal} />
            </div>
        );
    }
}