import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from '../App'
import Checkers from './Checkers'

module.exports = (
    <Route path="/" component={App}>
        <IndexRoute component={Checkers} />
    </Route>
);