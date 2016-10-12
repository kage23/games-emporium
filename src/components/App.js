import React from 'react'
import '../App.css'

import SiteHeader from './SiteHeader'

export default class App extends React.Component {
    render() {
        return (
            <div>
                <SiteHeader />
                {this.props.children}
            </div>
        );
    }
}