import React from 'react'
import { Link } from 'react-router'

export default class GamesList extends React.Component {
    render() {
        return (
            <div>
                <h2>Games List</h2>

                <ul>
                    <li>
                        <p><Link to="/games/checkers">Checkers</Link> Includes:</p>
                        <ul>
                            <li>Regular Checkers</li>
                            <li>Anti-Checkers</li>
                            <li>Crowded Checkers</li>
                            <li>Crowded Anti-Checkers</li>
                            <li>Sparse Checkers</li>
                            <li>Sparse Anti-Checkers</li>
                            <li>Tiny Checkers</li>
                            <li>Tiny Anti-Checkers</li>
                            <li>Mule Checkers</li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}