var React = require('react');

function Token (props) {
    var tokenCol, tokenRow, tokenSize, tokenStyle;

    tokenCol = parseInt(props.position.substr(props.position.indexOf('c') + 1));
    tokenRow = parseInt(props.position.substr(props.position.indexOf('r') + 1));

    tokenSize = (100 / props.boardSize) * 0.8 + '%';

    tokenStyle = {
        width: tokenSize,
        paddingTop: tokenSize,
        backgroundColor: props.color,
        left: (100 / props.boardSize) * (0.1 + tokenCol) + '%',
        top: (100 / props.boardSize) * (0.1 + tokenRow) + '%'
    };

    return (
        <div className="token" style={tokenStyle}></div>
    );
}

Token.propTypes = {
    boardSize: React.PropTypes.number.isRequired,
    color: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    position: React.PropTypes.string.isRequired
};

module.exports = Token;