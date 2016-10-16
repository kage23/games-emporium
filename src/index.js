import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory, Route, IndexRoute } from 'react-router'

import App from './components/App'
import GamesList from './components/GamesList'
import Checkers from './components/Checkers'

import './index.css'

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path={'/games' || '/games/'} component={App}>
            <IndexRoute component={GamesList} />
        </Route>
        <Route path="/games/checkers" component={Checkers} />
    </Router>,
    document.getElementById('root')
);
