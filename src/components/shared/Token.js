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
        var tokenCol, tokenRow, tokenSize, tokenStyle, className = 'token', iconSpan, kingColor;

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

        if (this.props.king) {
            if (ColorDistance(ColorToRGB(this.props.color), ColorToRGB('black')) > 225) {
                kingColor = 'black';
            } else {
                kingColor = 'white';
            }

            iconSpan = <span className="tokenIcon" style={{color:kingColor}}>&#9812;</span>;
        }

        switch (this.props.type) {
            case 'knight':
            case 'mule':
                tokenStyle.border = 0;
                tokenStyle.background = 'transparent';
                tokenStyle.color = this.props.color;
                iconSpan = <span className="tokenIcon">&#9822;</span>;
                break;

            case 'circle':
            default:
                tokenStyle.borderRadius = '50%';
                break;
        }

        if (this.props.highlighted) {
            className += ' highlighted';
        }

        return (
            <div className={className} style={tokenStyle} onClick={this.handleClick}>{iconSpan}</div>
        );
    }
}