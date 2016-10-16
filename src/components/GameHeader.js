import React from 'react'

export default class GameHeader extends React.Component {
    static propTypes = {
        game: React.PropTypes.string.isRequired,
        gameType: React.PropTypes.string
    };

    render() {
        var text = 'WELCOME TO ' + this.props.game;

        if (this.props.gameType)
            text += (' (' + this.props.gameType + ')');

        return <h2>{text}</h2>;
    }
}