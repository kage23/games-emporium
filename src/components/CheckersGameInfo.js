var React = require('react'),

    CheckersGameInfo = React.createClass({
        propTypes: {
            gameState: React.PropTypes.object.isRequired,
            determineValidMovesForPlayer: React.PropTypes.func.isRequired,
            newTurn: React.PropTypes.func.isRequired
        },

        handleClick: function (evt) {
            evt.preventDefault();

            this.props.newTurn();
        },

        render: function () {
            var winner,
                currentPlayer = this.props.gameState.players[this.props.gameState.currentTurn % 2] || {name:'',color:''},
                validMoves = this.props.determineValidMovesForPlayer(this.props.gameState.players[(this.props.gameState.currentTurn + 2) % 2]),
                noValidMovesStyle = {display:'none'};

            if (validMoves.length === 0) noValidMovesStyle.display = 'inline';

            this.props.gameState.players.forEach(function (player, playerIndex) {
                if (player.tokens.length === 0) winner = this.props.gameState.players[(playerIndex + 1) % 2];
            }.bind(this));

            if (!winner) {
                return (
                    <div className="gameInfo">
                        <h3>
                            It is <span style={{color:currentPlayer.color}}>{currentPlayer.name}</span>'s turn.
                            <a style={noValidMovesStyle} href="#" onClick={this.handleClick}>There are no valid
                                moves!</a>
                        </h3>
                    </div>
                );
            } else {
                return (
                    <div className="gameInfo">
                        <h3 style={{color:winner.color,textTransform:'uppercase'}}>{winner.name} WINS!!!!</h3>
                    </div>
                );
            }
        }
    });

module.exports = CheckersGameInfo;