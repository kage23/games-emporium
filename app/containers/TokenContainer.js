var React = require('react');
var Token = require('../components/Token');

function TokenContainer (props) {
    var tokenSize, tokenCol, tokenRow, tokenStyle = {};

    tokenCol = parseInt(props.cell.substr(props.cell.indexOf('c') + 1));
    tokenRow = parseInt(props.cell.substr(props.cell.indexOf('r') + 1));

    tokenSize = (100 / props.boardSize) * 0.8 + '%';

    if (props.type == 'circle') {
        tokenStyle = {
            width: tokenSize,
            paddingTop: tokenSize,
            borderRadius: '50%',
            border: '1px solid #000',
            position: 'absolute',
            backgroundColor: props.color
        };
    }

    tokenStyle.left = (100 / props.boardSize) * (0.1 + tokenCol) + '%';
    tokenStyle.top = (100 / props.boardSize) * (0.1 + tokenRow) + '%';

    return (
        <Token style={tokenStyle} />
    );
}

TokenContainer.propTypes = {
    type: React.PropTypes.string.isRequired,
    boardSize: React.PropTypes.number,
    cell: React.PropTypes.string.isRequired,
    color: React.PropTypes.string
};

module.exports = TokenContainer;