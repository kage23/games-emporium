import React from 'react'

import ColorToRGB from '../../utilities/ColorToRGB'
import ColorDistance from '../../utilities/ColorDistance'

export default class PlayerNameSpan extends React.Component {
    static propTypes = {
        player: React.PropTypes.object.isRequired
    };

    render() {
        var allowedColorDistance = 225,
            textStyle = {
                color: this.props.player.color
            };

        if (ColorDistance(ColorToRGB(this.props.player.color), ColorToRGB('white')) < allowedColorDistance) {
            textStyle = {
                color: 'black',
                WebkitTextFillColor: this.props.player.color,
                WebkitTextStrokeWidth: 1,
                WebkitTextStrokeColor: 'black'
            };
        }

        return <span style={textStyle}>{this.props.player.name}</span>;
    }
}