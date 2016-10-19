import React from 'react'
import { Panel } from 'react-bootstrap'

import PlayerNameSpan from './PlayerNameSpan'
import SimpleInfoListing from './SimpleInfoListing'

export default class PlayerInfoListing extends React.Component {
    static propTypes = {
        player: React.PropTypes.object.isRequired,
        dataListing: React.PropTypes.array.isRequired
    };

    render() {
        var dataListing = this.props.dataListing.map((item, idx) => {
            return <SimpleInfoListing label={item.label} value={item.value} key={idx} />
        });

        return (
            <Panel header={(<h3><PlayerNameSpan player={this.props.player} /></h3>)}>
                {dataListing}
            </Panel>
        );
    }
}