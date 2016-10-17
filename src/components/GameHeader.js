import React from 'react'
import { PageHeader, Breadcrumb } from 'react-bootstrap'

export default class GameHeader extends React.Component {
    static propTypes = {
        game: React.PropTypes.string.isRequired,
        gameTypeKey: React.PropTypes.string,
        gameTypeObject: React.PropTypes.object
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
                    (this.props.gameTypeKey && this.props.gameTypeKey !== 'regular') ?
                        ( <small>({this.props.gameTypeObject.label})</small> ) : ''
                }
                </PageHeader>
            </div>
        );
    }
}