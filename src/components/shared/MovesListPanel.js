import React from 'react'
import { Panel } from 'react-bootstrap'

export default class MovesListPanel extends React.Component {
    static propTypes = {
        moves: React.PropTypes.array.isRequired
    };

    render() {
        var movesList = this.props.moves.map((move, moveIndex) => {
            if (move.jump) return (
                <p key={moveIndex}>From {move.from} to {move.to}, jumping {move.jump}</p>
            );
            else return (
                <p key={moveIndex}>From {move.from} to {move.to}</p>
            );
        });

        return (
            <Panel collapsible header={(<h3>Moves List (click to show/hide)</h3>)}>
                {movesList}
            </Panel>
        );
    }
}