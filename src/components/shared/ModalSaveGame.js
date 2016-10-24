import React from 'react'
import { Modal, FormControl, Button } from 'react-bootstrap'

export default class ModalSaveGame extends React.Component {
    static propTypes = {
        saveGameText: React.PropTypes.string.isRequired,
        showModal: React.PropTypes.bool.isRequired,
        closeModal: React.PropTypes.func.isRequired
    };

    dontChangeText = () => {};

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Save Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>THE FOLLOWING TEXT IS YOUR SAVE GAME!! Please copy it and take care of it!</p>
                    <FormControl componentClass="textarea" defaultValue={this.props.saveGameText} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}