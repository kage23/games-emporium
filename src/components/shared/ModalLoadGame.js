import React from 'react'
import { Modal, FormControl, ButtonToolbar, Button } from 'react-bootstrap'

export default class ModalLoadGame extends React.Component {
    static propTypes = {
        showModal: React.PropTypes.bool.isRequired,
        closeModal: React.PropTypes.func.isRequired,
        loadGame: React.PropTypes.func.isRequired
    };

    state = {
        saveGameText: ''
    };

    updateSaveText = (evt) => {
        this.setState({saveGameText:evt.target.value});
    };

    loadGameHandler = (evt) => {
        evt.preventDefault();

        this.props.closeModal();
        this.props.loadGame(this.state.saveGameText);
    };

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Load Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please paste your savegame text into this box!</p>
                    <FormControl componentClass="textarea" value={this.state.saveGameText} onChange={this.updateSaveText} />
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar>
                        <Button onClick={this.props.closeModal}>Cancel</Button>
                        <Button bsStyle="primary" onClick={this.loadGameHandler}>Load game</Button>
                    </ButtonToolbar>
                </Modal.Footer>
            </Modal>
        );
    }
}