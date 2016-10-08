import React from 'react'
import { Link } from 'react-router'

export default class extends React.Component {
    render() {
        return (
            <div>
                <h3>Checkers Config</h3>

                <Link to="/play">Play the game!</Link>
            </div>
        );
    }
}