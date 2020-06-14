import './LogBug.css';
import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, InputGroup, InputGroupAddon, InputGroupText, Label } from 'reactstrap';
import './LogBug.css';
import authService from './api-authorization/AuthorizeService';

const AddattachmentStyling = {
  fontSize: "0.5rem",
  marginLeft: '20px',
  marginTop: '20px',
  display: 'inline-block',
}

export class EditBug extends Component {

  constructor(props) {
    super(props);

    this.state = {
      UserName: '',
      BugInfo: {}
    }

  }

  componentDidMount() {
    console.log("in componentDidMount")

    if (this.props.ShowEditDialog === null) {
      this.props.ShowEditDialog = false
    }
  }

  hideResultModal = () => {
    this.setState({ ShowResultDialog: false });
  };
  

  render() {
    if (this.props.BugInfo || this.props.BugInfo.id > 0) {
      let BugTitle = "Edit bug id:" + this.props.BugInfo.id
      console.log(this.props.BugInfo)
      return (
        <Modal isOpen={this.props.ShowEditDialog} toggle={this.props.ShowEditDialog} className="modal-contentEditBug" >
          <ModalHeader style={{ lineheight: "0.15", backgroundColor: "#F05F44", fontSize: "0.7rem" }}><h1 style={{ fontSize: "1.25rem" }}>{BugTitle}</h1></ModalHeader>
          <ModalBody style={{ whiteSpace: 'pre' }} >
            <InputGroup>
              <InputGroupAddon addonType="prepend" style={{ height: '35px' }}>
                <InputGroupText style={{ backgroundColor: '#F05F44', fontSize: '0.8rem' }}>Short description:</InputGroupText>
              </InputGroupAddon>
              <Input style={{ height: '35px' }} id="shortdescription" style={{ height: '35px', fontSize: '0.8rem' }} type="text" defaultValue={this.props.BugInfo.shortDescription} />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend" style={{ height: '35px' }}>
                <InputGroupText style={{ backgroundColor: '#F05F44', fontSize: '0.8rem' }}>Logged by:</InputGroupText>
              </InputGroupAddon>
              <Input style={{ height: '35px' }} id="LoggedBy" style={{ height: '35px', fontSize: '0.8rem' }} type="text" readOnly defaultValue={this.props.UserName} />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-primary" style={AddattachmentStyling} onClick={this.props.onDeactivateViewBug}>Ok,got it!</Button>{' '}
          </ModalFooter>
        </Modal>
      );
    }
  }
}