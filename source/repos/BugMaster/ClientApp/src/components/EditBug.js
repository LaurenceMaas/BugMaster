import './LogBug.css';
import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, NavLink, NavItem, Nav, TabContent } from 'reactstrap';
import authService from './api-authorization/AuthorizeService';
import { ShortDescription } from './ShortDescription';
import { StepsToRecreate } from './StepsToRecreate';
import { ExpectedActual } from './ExpectedActual';
import { Severity } from './Severity';
import { LogBug } from './LogBug';
import './LogBug.css';
import classnames from 'classnames';

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
      LoggedBy: {},
      ActiveTab: '1',
      Severities: [],
      Loading: true
    }

  }

  componentDidMount() {

    if (this.props.ShowEditDialog === null) {
      this.props.ShowEditDialog = false
    }
    authService.getAccessToken().then(token =>
      fetch('/api/Severities', { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } }))
      .then(response => response.json())
      .then(response => this.setState({ Severities: response, Loading: false }))

  }

  hideResultModal = () => {
    this.setState({ ShowResultDialog: false });
  };

  changeTab = (tab) => {
    this.setState({ ActiveTab: tab })
  }

  BugInfoChanged = (id, changedElement, elementText) => {
    console.log("in BugInfoChanged: ", elementText)
    switch (changedElement) {
      case "ShortDescription":
        this.setState({ Newshortdescription: elementText });
        break;

      case "StepsToRecreate":
        this.setState(() => {
          return { Newstepstorecreate: elementText };
        });
        break;

      case "newexpectedresult":
        this.setState(() => {
          return { Newexpectedresult: elementText };
        });
        break;

      case "newactualresult":
        this.setState(() => {
          return { Newactualresult: elementText };
        });
        break;

      default:

    }
    document.getElementById(id).style.visibility = "visible";

  }

  render() {

    let contents = LogBug.renderSeverities(this.state.Severities);

    if ((this.props.BugInfo.id > 0) && (this.props.LoggedBy[0])) {
      console.log(this.props.BugInfo)
      let BugTitle = "Edit bug id:" + this.props.BugInfo.id
      return (
        <Modal isOpen={this.props.ShowEditDialog} toggle={this.props.ShowEditDialog} className="modal-contentEditBug" >
          <ModalHeader style={{ lineheight: "0.15", backgroundColor: "#F05F44", fontSize: "0.7rem" }}><h1 style={{ fontSize: "1.25rem" }}>{BugTitle}</h1></ModalHeader>
          <ModalBody style={{ whiteSpace: 'pre' }} >
            <Nav tabs>

              <NavItem className="nav-itemBug">
                <NavLink className={classnames({ active: this.state.ActiveTab === '1' }, 'nav-linkBug')}
                  onClick={() => { this.changeTab('1'); }}>
                  Description
                </NavLink>
              </NavItem>
              <NavItem className="nav-itemBug">
                <NavLink className={classnames({ active: this.state.ActiveTab === '2' }, 'nav-linkBug')}
                  onClick={() => { this.changeTab('2'); }}>
                  Steps to recreate
                </NavLink>
              </NavItem>
              <NavItem className="nav-itemBug">
                <NavLink className={classnames({ active: this.state.ActiveTab === '3' }, 'nav-linkBug')}
                  onClick={() => { this.changeTab('3'); }}>
                  Expected vs Actual
                </NavLink>
              </NavItem>
              <NavItem className="nav-itemBug">
                <NavLink className={classnames({ active: this.state.ActiveTab === '4' }, 'nav-linkBug')}
                  onClick={() => { this.changeTab('4'); }}>
                   Severity
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={this.state.ActiveTab} className="TabContent">
              <ShortDescription ExistingText={this.props.BugInfo.shortDescription} onChange={this.BugInfoChanged} Id="1"></ShortDescription>
            </TabContent>
            <TabContent activeTab={this.state.ActiveTab} className="TabContent">
              <StepsToRecreate ExistingText={this.props.BugInfo.stepsToRecreate} onChange={this.BugInfoChanged} Id="2"></StepsToRecreate>
            </TabContent>
            <TabContent activeTab={this.state.ActiveTab} className="TabContent">
              <ExpectedActual ExistingActualResults={this.props.BugInfo.actualResult} ExistingExpectedResults={this.props.BugInfo.expectedResult} onChange={this.BugInfoChanged} Id="3"></ExpectedActual>
            </TabContent>
            <TabContent activeTab={this.state.ActiveTab} className="TabContent">
              <Severity Id="4" Contents={contents}></Severity>
            </TabContent>

          </ModalBody>            
          <ModalFooter>
            <Button id="SaveButton" className="btn btn-primary" style={{ fontSize: "0.5rem", marginLeft: '20px', marginTop: '20px', display: 'inline-block', visibility: 'hidden' }} onClick={this.props.onSave}>Save</Button>{' '}
            <Button className="btn btn-primary" style={AddattachmentStyling} onClick={this.props.onDeactivateViewBug}>Close</Button>{' '}
          </ModalFooter>
        </Modal>
      );
    } else {
      return "";
    }
  }
}