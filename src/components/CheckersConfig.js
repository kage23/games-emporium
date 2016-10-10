import React from 'react'

export default class CheckersConfig extends React.Component {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
        this.onFormChange = this.onFormChange.bind(this);
    }

    onClick(evt) {
        var configIsValid = true,
            player1Color = this.colorIsValid(this.props.gameState.players[0].color),
            player2Color = this.colorIsValid(this.props.gameState.players[1].color);

        evt.preventDefault();

        if (this.props.gameState.players[0].name === this.props.gameState.players[1].name) {
            alert('The players must have different names!');
            configIsValid = false;
        } else if (!player1Color) {
            alert(this.props.gameState.players[0].name + ' must have a valid color!');
            configIsValid = false;
        } else if (!player2Color) {
            alert(this.props.gameState.players[1].name + ' must have a valid color!');
            configIsValid = false;
        } else if (this.colorDistance(player1Color, player2Color) < 225) {
            alert('The players must have sufficiently different colors!');
            configIsValid = false;
        }

        if (configIsValid) {
            this.props.newGame();
        }
    }

    onFormChange(evt) {
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
    }

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
                       onChange={this.onFormChange}
                       />

                <label htmlFor="player1color">Input CSS-friendly Color</label>
                <input id="player1color"
                       data-player-id={0}
                       data-player-data="color"
                       type="text"
                       value={this.props.gameState.players[0].color}
                       onChange={this.onFormChange}
                       />

                <h4>Second Player</h4>

                <label htmlFor="player2name">Input Name</label>
                <input id="player2name"
                       data-player-id={1}
                       data-player-data="name"
                       type="text"
                       value={this.props.gameState.players[1].name}
                       onChange={this.onFormChange}
                       />

                <label htmlFor="player2color">Input CSS-friendly Color</label>
                <input id="player2color"
                       data-player-id={1}
                       data-player-data="color"
                       type="text"
                       value={this.props.gameState.players[1].color}
                       onChange={this.onFormChange}
                       />

                <a href="#" onClick={this.onClick}>Play the game!</a>
            </div>
        );
    }
}

CheckersConfig.propTypes = {
    gameState: React.PropTypes.object.isRequired,
    newGame: React.PropTypes.func.isRequired,
    updatePlayer: React.PropTypes.func.isRequired
};