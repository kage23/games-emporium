import React from 'react'
import { Row, Col, Panel, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

import PlayerConfigPanel from '../shared/PlayerConfigPanel'
import CheckerBoard from '../shared/CheckerBoard'
import Token from '../shared/Token'

import ColorDistance from '../utilities/ColorDistance'
import ColorToRGB from '../utilities/ColorToRGB'

export default class CheckersConfig extends React.Component {
    static propTypes = {
        gameTypes: React.PropTypes.object.isRequired,
        setGameType: React.PropTypes.func.isRequired,
        gameState: React.PropTypes.object.isRequired,
        newGame: React.PropTypes.func.isRequired,
        updatePlayer: React.PropTypes.func.isRequired,
        updateConfig: React.PropTypes.func.isRequired
    };

    playGame = (evt) => {
        var configIsValid = true,
            allowedColorDistance = 225,
            player1Color = ColorToRGB(this.props.gameState.players[0].color),
            player2Color = ColorToRGB(this.props.gameState.players[1].color),
            boardColor = ColorToRGB(this.props.gameState.config.color);

        evt.preventDefault();

        if (this.props.gameState.players[0].name === this.props.gameState.players[1].name) {
            alert('The players must have different names!');
            configIsValid = false;
        }
        if (!player1Color) {
            alert(this.props.gameState.players[0].name + ' must have a valid color!');
            configIsValid = false;
        }
        if (!player2Color) {
            alert(this.props.gameState.players[1].name + ' must have a valid color!');
            configIsValid = false;
        }
        if (ColorDistance(player1Color, player2Color) < allowedColorDistance) {
            alert('The players must have sufficiently different colors!');
            configIsValid = false;
        }
        if (!boardColor) {
            alert('The board color must be valid!');
            configIsValid = false;
        }
        if (ColorDistance(boardColor, ColorToRGB('white')) < allowedColorDistance) {
            alert('The board color is too close to white!');
            configIsValid = false;
        }
        if (ColorDistance(player1Color, ColorToRGB(boardColor)) < allowedColorDistance) {
            alert(this.props.gameState.players[0].name +
                '\'s color is too close to the board color (' + boardColor + ')!');
            configIsValid = false;
        }
        if (ColorDistance(player2Color, ColorToRGB(boardColor)) < allowedColorDistance) {
            alert(this.props.gameState.players[1].name +
                '\'s color is too close to the board color (' + boardColor + ')!');
            configIsValid = false;
        }

        if (configIsValid) {
            this.props.newGame();
        }
    };

    boardConfig = (evt) => {
        var configName = evt.target.dataset.config,
            newConfigObject = Object.assign({}, this.props.gameState.config);

        newConfigObject[configName] = evt.target.value;

        this.props.updateConfig(newConfigObject);
    };

    onPlayerChange = (evt) => {
        var newPlayerObject, playerIndex;

        playerIndex = parseInt(evt.target.dataset.playerId, 10);
        newPlayerObject = Object.assign({}, this.props.gameState.players[playerIndex]);

        if (evt.target.dataset.playerData === 'name') {
            if (evt.target.value === this.props.gameState.players[(playerIndex + 1) % 2].name) {
                alert('Your name must be different from ' +
                    this.props.gameState.players[(playerIndex + 1) % 2].name + '\'s!');
            }
        }

        newPlayerObject[evt.target.dataset.playerData] = evt.target.value;

        this.props.updatePlayer(newPlayerObject, playerIndex);
    };

    onAIToggle = (evt) => {
        var playerIndex = parseInt(evt.target.dataset.player, 10),
            newPlayerObject = Object.assign({}, this.props.gameState.players[playerIndex]);
        newPlayerObject.computer = evt.target.checked;
        if (newPlayerObject.computer && playerIndex === 0) newPlayerObject.name = 'Randmontgomery Burns';
        else if (newPlayerObject.computer && playerIndex === 1) newPlayerObject.name = 'Rando Checkrissian';
        else newPlayerObject.name = 'Player ' + (playerIndex + 1);
        this.props.updatePlayer(newPlayerObject, playerIndex);
    };

    onGameTypeChange = (evt) => {
        var target = evt.target;

        this.props.setGameType(target.value);
    };

    render() {
        var typeOptions = [];

        this.props.gameTypes.forEach((value, key) => {
            typeOptions.push(<option key={key} value={key}>{value.label}</option>);
        });

        return (
            <div className="checkersConfig">
                <Row style={{marginBottom:8}}>
                    <Col xs={8}>
                        <h3 style={{marginTop:0}}>Checkers Config</h3>
                    </Col>
                    <Col xs={4}>
                        <Button bsStyle="primary" style={{float:'right'}} href="#" onClick={this.playGame}>
                            Let's play!
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <PlayerConfigPanel
                            player={this.props.gameState.players[0]}
                            playerIndex={0}
                            updatePlayer={this.props.updatePlayer}
                            />
                    </Col>
                    <Col sm={6}>
                        <PlayerConfigPanel
                            player={this.props.gameState.players[1]}
                            playerIndex={1}
                            updatePlayer={this.props.updatePlayer}
                            />
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <Panel header={(<h3>Game Config</h3>)}>
                            <FormGroup controlId="gameType">
                                <ControlLabel>Game Type</ControlLabel>
                                <FormControl
                                    componentClass="select"
                                    placeholder="select"
                                    value={this.props.gameState.gameType}
                                    onChange={this.onGameTypeChange}
                                    >
                                    {typeOptions}
                                </FormControl>
                            </FormGroup>
                            <Panel collapsible defaultExpanded={true} header='Show/Hide description'>
                                {this.props.gameTypes.get(this.props.gameState.gameType).description}
                            </Panel>
                            <FormGroup controlId="boardColor">
                                <ControlLabel>Board Color</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.props.gameState.config.color}
                                    data-config="color"
                                    onChange={this.boardConfig}
                                    />
                            </FormGroup>
                        </Panel>
                    </Col>
                    <Col sm={6} xsHidden>
                        <Panel header={<h3>Board Sample</h3>}>
                            <div style={{maxWidth:206}}>
                                <CheckerBoard
                                    size={2}
                                    color={this.props.gameState.config.color}
                                    secondaryColor={this.props.gameState.config.secondaryColor}
                                    highlightedCells={[]}
                                    handleCellClick={() => {}}
                                >
                                    <Token
                                        boardSize={2}
                                        type={'circle'}
                                        color={this.props.gameState.players[0].color}
                                        handleClick={() => {}}
                                        position={'c0r1'}
                                        king={false}
                                        highlighted={false}
                                        key="player1SampleToken"
                                    />
                                    <Token
                                        boardSize={2}
                                        type={'circle'}
                                        color={this.props.gameState.players[1].color}
                                        handleClick={() => {}}
                                        position={'c1r0'}
                                        king={false}
                                        highlighted={false}
                                        key="player2SampleToken"
                                    />
                                </CheckerBoard>
                            </div>
                        </Panel>
                    </Col>
                </Row>
            </div>
        );
    }
}