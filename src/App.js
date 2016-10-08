import React from 'react';
import './App.css';

import CheckersGame from './components/CheckersGame';
import SiteHeader from './components/SiteHeader';
import GameHeader from './components/GameHeader';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <SiteHeader />
                <GameHeader game="CHECKERSSSSSSSS" />

                <CheckersGame />
            </div>
        );
    }
}