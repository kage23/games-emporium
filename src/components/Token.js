var React = require('react');

var Token = React.createClass({
    propTypes: {
        boardSize: React.PropTypes.number.isRequired,
        type: React.PropTypes.string.isRequired,
        color: React.PropTypes.string.isRequired,
        handleClick: React.PropTypes.func.isRequired,
        position: React.PropTypes.string.isRequired,
        king: React.PropTypes.bool.isRequired,
        highlighted: React.PropTypes.bool.isRequired
    },

    handleClick: function () {
        this.props.handleClick(this);
    },

    render: function () {
        var tokenCol, tokenRow, tokenSize, tokenStyle, className = 'token';

        tokenCol = parseInt(this.props.position.substr(this.props.position.indexOf('c') + 1), 10);
        tokenRow = parseInt(this.props.position.substr(this.props.position.indexOf('r') + 1), 10);

        tokenSize = (100 / this.props.boardSize) * 0.8 + '%';

        tokenStyle = {
            width: tokenSize,
            paddingTop: tokenSize,
            backgroundColor: this.props.color,
            left: (100 / this.props.boardSize) * (0.1 + tokenCol) + '%',
            top: (100 / this.props.boardSize) * (0.1 + tokenRow) + '%'
        };

        if (this.props.highlighted) {
            className += ' highlighted';
        }

        return (
            <div className={className} style={tokenStyle} onClick={this.handleClick}></div>
        );
    }
});

module.exports = Token;