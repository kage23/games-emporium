import React from 'react';

export default class GameHeader extends React.Component {
    render() {
        return <h2>WELCOME TO {this.props.game}</h2>;
    }
}

GameHeader.propTypes = {
    game: React.PropTypes.string.isRequired
};