var React = require('react');
var Token = require('../components/Token');

var TokenContainer = React.createClass({
    propTypes: {
        type: React.PropTypes.string.isRequired,
        boardSize: React.PropTypes.number,
        startingCell: React.PropTypes.string.isRequired,
        color: React.PropTypes.string,
        owner: React.PropTypes.number.isRequired,
        handleClick: React.PropTypes.func.isRequired,
        getState: React.PropTypes.func.isRequired
    },

    getInitialState: function () {
        return {
            cell: this.props.startingCell,
            activePlayer: false,
            highlighted: false,
            king: false
        };
    },

    handleClick: function () {
        this.props.handleClick(this);
    },

    getState: function () {
        this.props.getState(this);
    },

    highlightToken: function () {
        this.setState({highlighted: true});
    },

    clearHighlight: function () {
        this.setState({highlighted: false});
    },

    render: function () {
        var tokenCol, tokenRow, tokenSize, tokenStyle = {};

        tokenCol = parseInt(this.state.cell.substr(this.state.cell.indexOf('c') + 1));
        tokenRow = parseInt(this.state.cell.substr(this.state.cell.indexOf('r') + 1));

        tokenSize = (100 / this.props.boardSize) * 0.8 + '%';

        if (this.props.type == 'circle') {
            tokenStyle = {
                width: tokenSize,
                paddingTop: tokenSize,
                borderRadius: '50%',
                border: '1px solid #000',
                position: 'absolute',
                backgroundColor: this.props.color
            };
        }

        tokenStyle.zIndex = 10;
        tokenStyle.left = (100 / this.props.boardSize) * (0.1 + tokenCol) + '%';
        tokenStyle.top = (100 / this.props.boardSize) * (0.1 + tokenRow) + '%';

        tokenStyle.transition = 'left 0.5s ease-out, top 0.5s ease-out, z-index 0s ease-out 0.5s';

        if (this.state.highlighted) {
            tokenStyle.boxShadow = '0px 0px 5px 5px #0f0';
            tokenStyle.zIndex = 20;
        }

        return (
            <Token style={tokenStyle} handleClick={this.handleClick} id={this.props.startingCell} />
        );
    }
});

module.exports = TokenContainer;