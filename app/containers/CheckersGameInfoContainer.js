var React = require('react');
var CheckersGameInfo = require('../components/CheckersGameInfo');

var CheckersGameInfoContainer = React.createClass({
    render: function () {
        return (
            <CheckersGameInfo />
        );
    }
});

module.exports = CheckersGameInfoContainer;