import React from 'react'

import GameHeader from './GameHeader'

export default class extends React.Component {
    render() {
        return (
            <div>
                <GameHeader game="CHECKERSSSSSSSS" />
                {this.props.children}
            </div>
        );
    }
}