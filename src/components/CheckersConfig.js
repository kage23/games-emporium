import React from 'react'

export default class CheckersConfig extends React.Component {
    static propTypes = {
        gameState: React.PropTypes.object.isRequired,
        newGame: React.PropTypes.func.isRequired,
        updatePlayer: React.PropTypes.func.isRequired,
        updateConfig: React.PropTypes.func.isRequired
    };

    playGame = (evt) => {
        var configIsValid = true,
            allowedColorDistance = 225,
            player1Color = this.colorIsValid(this.props.gameState.players[0].color),
            player2Color = this.colorIsValid(this.props.gameState.players[1].color),
            boardColor = this.colorIsValid(this.props.gameState.config.color);

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
        if (this.colorDistance(player1Color, player2Color) < allowedColorDistance) {
            alert('The players must have sufficiently different colors!');
            configIsValid = false;
        }
        if (!boardColor) {
            alert('The board color must be valid!');
            configIsValid = false;
        }
        if (this.colorDistance(boardColor, this.colorIsValid('white')) < allowedColorDistance) {
            alert('The board color is too close to white!');
            configIsValid = false;
        }
        if (this.colorDistance(player1Color, this.colorIsValid(boardColor)) < allowedColorDistance) {
            alert(this.props.gameState.players[0].name +
                '\'s color is too close to the board color (' + boardColor + ')!');
            configIsValid = false;
        }
        if (this.colorDistance(player2Color, this.colorIsValid(boardColor)) < allowedColorDistance) {
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

    onAIToggle = () => {
        var newPlayerObject = Object.assign({}, this.props.gameState.players[1]);
        newPlayerObject.computer = ! newPlayerObject.computer;
        if (newPlayerObject.computer) newPlayerObject.name = 'Rando Checkrissian';
        this.props.updatePlayer(newPlayerObject, 1);
    };

    colorIsValid(stringToTest) {
        // From http://stackoverflow.com/a/16994164
        // and http://stackoverflow.com/a/1573154
        var colorIsValid, d, returnColor;

        if (stringToTest === "") { colorIsValid = false; }
        if (stringToTest === "inherit") { colorIsValid = false; }
        if (stringToTest === "transparent") { colorIsValid = false; }

        d = document.createElement("div");
        d.style.color = "rgb(0, 0, 0)";
        d.style.color = stringToTest;
        if (d.style.color !== "rgb(0, 0, 0)") { colorIsValid = true; }
        else {
            d.style.color = "rgb(255, 255, 255)";
            d.style.color = stringToTest;
            colorIsValid = d.style.color !== "rgb(255, 255, 255)";
        }

        if (colorIsValid) {
            document.body.appendChild(d);
            returnColor = window.getComputedStyle(d).color;
            document.body.removeChild(d);
            return returnColor;
        } else { return false; }
    }

    colorDistance(color1, color2) {
        var color1RGB, color2RGB;

        function colorStringToRGBArray (colorString) {
            return colorString.match(/\d+/g).map(numStr => { return parseInt(numStr, 10); });
        }

        function colorDistance (color1, color2) {
            // From http://stackoverflow.com/a/2103422
            var rmean, r, g, b;
            rmean = (color1[0] + color2[0]) / 2;
            r = color1[0] - color2[0];
            g = color1[1] - color2[1];
            b = color1[2] - color2[2];
            return Math.sqrt((((512 + rmean) * r * r) >> 8) + 4 * g * g + (((767 - rmean) * b * b) >> 8));
        }

        color1RGB = colorStringToRGBArray(color1);
        color2RGB = colorStringToRGBArray(color2);

        return colorDistance(color1RGB, color2RGB);
    }

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