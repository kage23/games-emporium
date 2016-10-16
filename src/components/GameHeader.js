import React from 'react'
import { Link } from 'react-router'

export default class GameHeader extends React.Component {
    static propTypes = {
        game: React.PropTypes.string.isRequired,
        gameType: React.PropTypes.string
    };

    render() {
        var text = 'WELCOME TO ' + this.props.game;

        if (this.props.gameType)
            text += (' (' + this.props.gameType + ')');

        return (
            <div>
                <h2>{text}</h2>

                <Link to="/games/">Back to Games List</Link>
            </div>
        );
    }
}