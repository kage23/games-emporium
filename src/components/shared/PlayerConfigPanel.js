import React from 'react'
import { Panel, FormGroup, ControlLabel, FormControl, Checkbox } from 'react-bootstrap'

import NumberToOrdWord from '../utilities/NumberToOrdWord'

export default class PlayerConfigPanel extends React.Component {
    static propTypes = {
        player: React.PropTypes.object.isRequired,
        playerIndex: React.PropTypes.number.isRequired,
        updatePlayer: React.PropTypes.func.isRequired
    };

    onNameOrColorChange = (evt) => {
        var newPlayerObject;

        newPlayerObject = Object.assign({}, this.props.player);

        newPlayerObject[evt.target.dataset.playerData] = evt.target.value;

        this.props.updatePlayer(newPlayerObject, this.props.playerIndex);
    };

    onAIToggle = (evt) => {
        var newPlayerObject = Object.assign({}, this.props.player);

        newPlayerObject.computer = evt.target.checked;

        if (newPlayerObject.computer) {
            newPlayerObject.name = this.props.playerIndex === 0 ? 'Randmontgomery Burns' : 'Rando Checkrissian';
        } else {
            newPlayerObject.name = 'Player ' + (this.props.playerIndex + 1);
        }

        this.props.updatePlayer(newPlayerObject, this.props.playerIndex);
    };

    render() {
        var playerOrd = NumberToOrdWord[this.props.playerIndex + 1],
            cappedPlayerOrd = playerOrd.substr(0,1).toUpperCase() + playerOrd.substr(1);

        return (
            <Panel header={(<h3>{cappedPlayerOrd} Player</h3>)}>
                <FormGroup
                    controlId={'player' + this.props.playerIndex + 'name'}>
                    <ControlLabel>Input Name</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.props.player.name}
                        placeholder="Input Name"
                        onChange={this.onNameOrColorChange}
                        data-player-data="name"
                        />
                </FormGroup>

                <Checkbox
                    checked={this.props.player.computer}
                    onChange={this.onAIToggle}
                    >
                    Activate the AI!!!
                </Checkbox>

                <FormGroup
                    controlId={'player' + this.props.playerIndex + 'color'}>
                    <ControlLabel>Input CSS-friendly Color</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.props.player.color}
                        placeholder="Input Color"
                        onChange={this.onNameOrColorChange}
                        data-player-data="color"
                        />
                </FormGroup>
            </Panel>
        );
    }
}