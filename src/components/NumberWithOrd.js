import React from 'react'

export default class NumberWithOrd extends React.Component {
    static propTypes = {
        number: React.PropTypes.number.isRequired
    };

    render() {
        var ord;

        if (this.props.number % 10 === 1 && this.props.number % 100 !== 11) ord = 'st';
        else if (this.props.number % 10 === 2 && this.props.number % 100 !== 12) ord = 'nd';
        else if (this.props.number % 10=== 3 && this.props.number % 100 !== 13) ord = 'rd';
        else ord = 'th';

        return <span>{this.props.number + ord}</span>;
    }
}