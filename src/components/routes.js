import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from '../App'
import Checkers from './Checkers'
import CheckersConfig from './CheckersConfig'
import CheckersGame from './CheckersGame'

module.exports = (
    <Route path="/" component={App}>
        <Route component={Checkers}>
            <IndexRoute component={CheckersConfig}></IndexRoute>
            <Route path="/play" component={CheckersGame} />
        </Route>
    </Route>
);