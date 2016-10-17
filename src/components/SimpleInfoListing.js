import React from 'react'

export default class SimpleInfoListing extends React.Component {
    static propTypes = {
        label: React.PropTypes.string.isRequired,
        value: React.PropTypes.any.isRequired
    };

    render () {
        return (
            <p><strong>{this.props.label}:</strong> {this.props.value}</p>
        );
    }
}