var React = require('react');
var logo = require('./logo.svg');
import './App.css';

var CheckersGame = require('./components/CheckersGame');
var SiteHeader = require('./components/SiteHeader');
var GameHeader = require('./components/GameHeader');

function App () {
    return (
        <div>
            <SiteHeader />
            <GameHeader game="CHECKERSSSSSSSS" />

            <CheckersGame />
        </div>
    );
}

module.exports = App;