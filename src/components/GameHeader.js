var React = require('react');

function GameHeader (props) {
    return <h2>WELCOME TO {props.game}</h2>;
};

GameHeader.propTypes = {
    game: React.PropTypes.string.isRequired
};

module.exports = GameHeader;