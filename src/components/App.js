import React from 'react'
import { Grid, Breadcrumb } from 'react-bootstrap'
import '../App.css'

import SiteHeader from './SiteHeader'

export default class App extends React.Component {
    render() {
        return (
            <Grid>
                <Breadcrumb>
                    <Breadcrumb.Item active>
                        Games
                    </Breadcrumb.Item>
                </Breadcrumb>
                <SiteHeader />
                {this.props.children}
            </Grid>
        );
    }
}