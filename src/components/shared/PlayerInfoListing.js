import React from 'react'
import { Panel } from 'react-bootstrap'

import SimpleInfoListing from './SimpleInfoListing'

export default class PlayerInfoListing extends React.Component {
    static propTypes = {
        playerName: React.PropTypes.string.isRequired,
        dataListing: React.PropTypes.array.isRequired
    };

    render() {
        var dataListing = this.props.dataListing.map((item, idx) => {
            return <SimpleInfoListing label={item.label} value={item.value} key={idx} />
        });

        return (
            <Panel header={(<h3>{this.props.playerName}</h3>)}>
                {dataListing}
            </Panel>
        );
    }
}