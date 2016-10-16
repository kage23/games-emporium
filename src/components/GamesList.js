import React from 'react'
import { Link } from 'react-router'

export default class GamesList extends React.Component {
    render() {
        return (
            <div>
                <h2>Games List</h2>

                <ul>
                    <li><Link to="/games/checkers">Checkers</Link></li>
                </ul>
            </div>
        );
    }
}