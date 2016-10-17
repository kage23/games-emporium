import React from 'react'
import { PageHeader, Breadcrumb } from 'react-bootstrap'

export default class GameHeader extends React.Component {
    static propTypes = {
        game: React.PropTypes.string.isRequired,
        gameType: React.PropTypes.string
    };

    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href="/games/">
                        Games
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        Checkers
                    </Breadcrumb.Item>
                </Breadcrumb>

                <PageHeader>
                    Welcome to {this.props.game}! {
                    this.props.gameType ? ( <small>({this.props.gameType})</small> ) : ''
                }
                </PageHeader>
            </div>
        );
    }
}