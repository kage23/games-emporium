import React from 'react'

export default class GameHeader extends React.Component {
    static propTypes = {
        game: React.PropTypes.string.isRequired
    };

    render() {
        return <h2>WELCOME TO {this.props.game}</h2>;
    }
}