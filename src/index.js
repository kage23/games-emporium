import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import routes from './components/routes'
import './index.css'

ReactDOM.render(
    <Router routes={routes} history={browserHistory}></Router>,
    document.getElementById('root')
);
