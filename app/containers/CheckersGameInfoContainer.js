var React = require('react');
var CheckersGameInfo = require('../components/CheckersGameInfo');

var CheckersGameInfoContainer = React.createClass({
    render: function () {
        var currentPlayer = this.props.data.players[this.props.data.currentTurn % 2];

        return (
            <CheckersGameInfo
                name={currentPlayer.name}
                color={currentPlayer.color}
            />
        );
    }
});

CheckersGameInfoContainer.propTypes = {
    data: React.PropTypes.object.isRequired
};

module.exports = CheckersGameInfoContainer;