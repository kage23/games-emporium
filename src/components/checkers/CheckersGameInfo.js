import React from 'react'
import { ButtonToolbar, Button, Row, Col, Panel } from 'react-bootstrap'

import PlayerInfoListing from '../shared/PlayerInfoListing'
import MovesListPanel from '../shared/MovesListPanel'
import ModalSaveGame from '../shared/ModalSaveGame'

export default class CheckersGameInfo extends React.Component {
    static propTypes = {
        gameTypes: React.PropTypes.object.isRequired,
        gameState: React.PropTypes.object.isRequired,
        backToConfig: React.PropTypes.func.isRequired,
        saveGame: React.PropTypes.func.isRequired
    };

    state = {
        showSaveModal: false
    };

    newGameClickHandler = (evt) => {
        evt.preventDefault();
        this.props.backToConfig();
    };

    saveGameClickHandler = (evt) => {
        evt.preventDefault();

        this.setState({ showSaveModal: true });
    };

    closeSaveModal = (evt) => {
        evt.preventDefault();

        this.setState({ showSaveModal: false });
    };

    render() {
        var generatePlayerInfoBox = (player, playerIndex) => {
            var dataListing = [];

            if (this.props.gameState.gameType === 'mule') {
                dataListing.push({
                    label: 'Men and Kings',
                    value: player.tokens.filter(token => {return token.type === 'regular' || typeof token.type === 'undefined'}).length
                });
                dataListing.push({
                    label: 'Mules',
                    value: player.tokens.filter(token => {return token.type === 'mule';}).length
                });
                dataListing.push({
                    label: 'Kings',
                    value: player.tokens.filter(token => {return token.king;}).length
                });

            } else {
                dataListing.push({
                    label: 'Total men remaining',
                    value: player.tokens.length
                });
                dataListing.push({
                    label: 'Kings',
                    value: player.tokens.filter(token => {return token.king;}).length
                });
                dataListing.push({
                    label: 'Captures',
                    value: player.captures
                });
            }

            return (
                <Col lg={6} key={playerIndex}>
                    <PlayerInfoListing player={player} dataListing={dataListing}
                        />
                </Col>
            );
        };

        return (
            <div className="gameInfo">
                <Row>
                    <Col xs={12}>
                        <ButtonToolbar>
                            <Button bsStyle="primary" className="pull-right" onClick={this.newGameClickHandler}>
                                {this.props.gameState.winner ? 'New' : 'Abandon'} game
                            </Button>
                            <Button bsStyle="primary" className="pull-right" onClick={this.saveGameClickHandler}>Save game</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
                <Row style={{marginTop:8}}>
                    <Col lg={12}>
                        <Panel collapsible header='Show/Hide game description'>
                            {this.props.gameTypes.get(this.props.gameState.gameType).description}
                        </Panel>
                    </Col>
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