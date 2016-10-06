var React = require('react'),

    CheckersGameInfo = React.createClass({
        render: function () {
            var currentPlayer = this.props.gameState.players[this.props.gameState.currentTurn % 2] || {name:'',color:''};

            return (
                <div className="gameInfo">
                    <h3>It is <span style={{color:currentPlayer.color}}>{currentPlayer.name}</span>'s turn.</h3>
                </div>
            );
        }
    });

CheckersGameInfo.propTypes = {
    gameState: React.PropTypes.object.isRequired
};

module.exports = CheckersGameInfo;