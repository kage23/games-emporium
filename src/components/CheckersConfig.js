import React from 'react'

export default class CheckersConfig extends React.Component {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
        this.onFormChange = this.onFormChange.bind(this);
    }

    onClick(evt) {
        evt.preventDefault();

        this.props.newGame();
    }

    onFormChange(evt) {
        var playerObject, playerIndex;

        playerIndex = evt.target.dataset.playerId;
        playerObject = Object.assign({}, this.props.gameState.players[playerIndex]);

        playerObject[evt.target.dataset.playerData] = evt.target.value;

        this.props.updatePlayer(playerObject, playerIndex);
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