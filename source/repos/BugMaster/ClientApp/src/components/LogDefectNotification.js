import React, { Component } from 'react';
import {Button,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class LogDefectNotification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShowDialog: false
        };
    }

    showModal = () => {
        this.setState({ ShowDialog: true });
    };

    hideModal = () => {
        this.setState({ ShowDialog: false });
    };

    render() {
        console.log("this.props:",this.props)
        return(
            <div>
                <Modal isOpen={this.state.ShowDialog} toggle={this.showModal}>
                    <ModalHeader>Nested Modal title</ModalHeader>
                    <ModalBody>Stuff and things</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.hideModal}>Ok,got!</Button>{' '}
                    </ModalFooter>
                </Modal>          
            
            </div>);
    }
}