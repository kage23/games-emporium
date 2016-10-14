import React from 'react'

export default class CheckersConfig extends React.Component {
    static propTypes = {
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

    render() {
        return (
            <div className="checkersConfig">
                <h3>Checkers Config</h3>

                <h4>First Player</h4>

                <label htmlFor="player1name">Input Name</label>
                <input id="player1name"
                       data-player-id={0}
                       data-player-data="name"
                       type="text"
                       value={this.props.gameState.players[0].name}
                       onChange={this.onPlayerChange}
                       />

                <label>
                    <input type="checkbox"
                           data-player={0}
                           checked={this.props.gameState.players[0].computer}
                           onChange={this.onAIToggle}
                        />
                    Activate the AI!!!
                </label>

                <label htmlFor="player1color">Input CSS-friendly Color</label>
                <input id="player1color"
                       data-player-id={0}
                       data-player-data="color"
                       type="text"
                       value={this.props.gameState.players[0].color}
                       onChange={this.onPlayerChange}
                       />

                <h4>Second Player</h4>

                <label htmlFor="player2name">Input Name</label>
                <input id="player2name"
                       data-player-id={1}
                       data-player-data="name"
                       type="text"
                       value={this.props.gameState.players[1].name}
                       onChange={this.onPlayerChange}
                       disabled={this.props.gameState.players[1].computer}
                       />

                <label>
                    <input type="checkbox"
                           data-player={1}
                           checked={this.props.gameState.players[1].computer}
                           onChange={this.onAIToggle}
                           />
                    Activate the AI!!!
                </label>

                <label htmlFor="player2color">Input CSS-friendly Color</label>
                <input id="player2color"
                       data-player-id={1}
                       data-player-data="color"
                       type="text"
                       value={this.props.gameState.players[1].color}
                       onChange={this.onPlayerChange}
                       />

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