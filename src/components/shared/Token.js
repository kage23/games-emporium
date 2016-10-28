import React from 'react'

import ColorDistance from '../../utilities/ColorDistance'
import ColorToRGB from '../../utilities/ColorToRGB'

export default class Token extends React.Component {
    static propTypes = {
        boardSize: React.PropTypes.number.isRequired,
        type: React.PropTypes.string.isRequired,
        color: React.PropTypes.string.isRequired,
        handleClick: React.PropTypes.func.isRequired,
        position: React.PropTypes.string.isRequired,
        king: React.PropTypes.bool.isRequired,
        highlighted: React.PropTypes.bool.isRequired
    };

    handleClick = () => {
        this.props.handleClick(this);
    };

    render() {
        var tokenCol, tokenRow, tokenSize, tokenStyle, className = 'token', kingSpan, kingColor;

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

        if (this.props.king) {
            if (ColorDistance(ColorToRGB(this.props.color), ColorToRGB('black')) > 225) {
                kingColor = 'black';
            } else {
                kingColor = 'white';
            }

            kingSpan = <span className="king" style={{color:kingColor}}>&#9812;</span>;
        }

        return (
            <div className={className} style={tokenStyle} onClick={this.handleClick}>{kingSpan}</div>
        );
    }
}