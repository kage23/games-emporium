import React from 'react'
import { Row, Col, Panel, FormGroup, ControlLabel, FormControl, Checkbox } from 'react-bootstrap'

export default class CheckersConfig extends React.Component {
    static propTypes = {
        gameTypes: React.PropTypes.object.isRequired,
        setGameType: React.PropTypes.func.isRequired,
        gameState: React.PropTypes.object.isRequired,
        newGame: React.PropTypes.func.isRequired,
        updatePlayer: React.PropTypes.func.isRequired,
        updateConfig: React.PropTypes.func.isRequired,
        colorToRGB: React.PropTypes.func.isRequired,
        colorDistance: React.PropTypes.func.isRequired
    };

    playGame = (evt) => {
        var configIsValid = true,
            allowedColorDistance = 225,
            player1Color = this.props.colorToRGB(this.props.gameState.players[0].color),
            player2Color = this.props.colorToRGB(this.props.gameState.players[1].color),
            boardColor = this.props.colorToRGB(this.props.gameState.config.color);

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
        if (this.props.colorDistance(player1Color, player2Color) < allowedColorDistance) {
            alert('The players must have sufficiently different colors!');
            configIsValid = false;
        }
        if (!boardColor) {
            alert('The board color must be valid!');
            configIsValid = false;
        }
        if (this.props.colorDistance(boardColor, this.props.colorToRGB('white')) < allowedColorDistance) {
            alert('The board color is too close to white!');
            configIsValid = false;
        }
        if (this.props.colorDistance(player1Color, this.props.colorToRGB(boardColor)) < allowedColorDistance) {
            alert(this.props.gameState.players[0].name +
                '\'s color is too close to the board color (' + boardColor + ')!');
            configIsValid = false;
        }
        if (this.props.colorDistance(player2Color, this.props.colorToRGB(boardColor)) < allowedColorDistance) {
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
                <Row>
                    <Col xs={12}>
                        <h3>Checkers Config</h3>
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <Panel header={(<h3>First Player</h3>)}>
                            <FormGroup
                                controlId="player1name">
                                <ControlLabel>Input Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.props.gameState.players[0].name}
                                    placeholder="Input Name"
                                    onChange={this.onPlayerChange}
                                    data-player-id={0}
                                    data-player-data="name"
                                    />
                            </FormGroup>

                            <Checkbox
                                data-player={0}
                                checked={this.props.gameState.players[0].computer}
                                onChange={this.onAIToggle}
                                >
                                Activate the AI!!!
                            </Checkbox>

                            <FormGroup
                                controlId="player1color">
                                <ControlLabel>Input CSS-friendly Color</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.props.gameState.players[0].color}
                                    placeholder="Input Color"
                                    onChange={this.onPlayerChange}
                                    data-player-id={0}
                                    data-player-data="color"
                                    />
                            </FormGroup>
                        </Panel>
                    </Col>
                    <Col sm={6}>
                        <Panel header={(<h3>Second Player</h3>)}>
                            <FormGroup
                                controlId="player2name">
                                <ControlLabel>Input Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.props.gameState.players[1].name}
                                    placeholder="Input Name"
                                    onChange={this.onPlayerChange}
                                    data-player-id={1}
                                    data-player-data="name"
                                    />
                            </FormGroup>

                            <Checkbox
                                data-player={1}
                                checked={this.props.gameState.players[1].computer}
                                onChange={this.onAIToggle}
                                >
                                Activate the AI!!!
                            </Checkbox>

                            <FormGroup
                                controlId="player2color">
                                <ControlLabel>Input CSS-friendly Color</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.props.gameState.players[1].color}
                                    placeholder="Input Color"
                                    onChange={this.onPlayerChange}
                                    data-player-id={1}
                                    data-player-data="color"
                                    />
                            </FormGroup>
                        </Panel>
                    </Col>
                </Row>





                <h4>Game config</h4>
                <select
                    value={this.props.gameState.gameType}
                    onChange={this.onGameTypeChange}
                    >
                    {typeOptions}
                </select>
                {this.props.gameTypes.get(this.props.gameState.gameType).description}

                <h4>Board config</h4>
                <label htmlFor="boardColor">Board Color</label>
                <input id="boardColor"
                       type="text"
                       value={this.props.gameState.config.color}
                       data-config="color"
                       onChange={this.boardConfig}
                       />

                <a href="#" onClick={this.playGame}>Play the game!</a>
            </div>
        );
    }
}