import React, { Component } from 'react'
import authService from './api-authorization/AuthorizeService';
import {  TabContent, NavLink, NavItem, Nav, Form, FormGroup,Modal,Button, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';
import { Attachments } from './Attachments';
import { ShortDescription } from './ShortDescription';
import { StepsToRecreate } from './StepsToRecreate';
import { Severity } from './Severity';
import { ExpectedActual } from './ExpectedActual';
import { onAddAttachment } from './AttachmentLibrary';
import { Notes } from './Notes';
import './LogBug.css';
import classnames from 'classnames';

const AddattachmentStyling = {
    fontSize: "0.5rem",
    marginLeft: '20px',
    marginTop: '20px',
    display: 'inline-block',
}

export class LogBug extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: null,
            userId: null,
            Severities: [],
            Loading: true,
            Attachments: [],
            Notes: [],
            ShowLogDefectDialog: true,
            Response: null,
            ShowResultDialog: false,
            ModalTitle: "",
            ModalContent: "",
            ActiveTab :'1',
            Logbug : "log bug"
      };    

    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
        this.populateSeverities();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    onRemoveNote(e, rowname, tableId) {

      e.preventDefault();
      let rowtoRemove = document.getElementById(rowname)
      let noteToRemove = this.state.Notes.find(element => element.name === rowtoRemove.cells[0].textContent)

      rowtoRemove.remove();
      this.state.Notes.splice(this.state.Notes.indexOf(noteToRemove), 1)
    }

  getFiles = (files) => {
    var attachmentFiles = []
    for (var i = 0; i < files.length; i++) {
      if (!this.state.Attachments.find(element => element.name === files[i].name)) {
        attachmentFiles.push(files[i])
      }
    }
    return attachmentFiles;
  }

  setFile = (e) => {
    for (var i = 0; i < e.target.files.length; i++) {

      if (!this.state.Attachments.find(element => element.name === e.target.files[i].name)) {
        this.state.Attachments.push(e.target.files[i])
      }
    }

  }

  onAddNote = (e, tableId, Note) => {
    e.preventDefault();
    let tableRef = document.getElementById(tableId);
    let noteRef = document.getElementById(Note);

    if (noteRef.value !== "")
    {

      if (tableRef != null) {
        let newRow = tableRef.insertRow(-1);

        let NoteVal = newRow.insertCell(0);
        NoteVal.innerHTML = noteRef.value;
        NoteVal.style = "font-size: 0.75rem;";

        let rowname = "removeNote" + (tableRef.rows.length - 1)
        newRow.id = rowname

        let removeButton = newRow.insertCell(1);
        var btn = document.createElement(rowname + "button");
        btn.type = "button";
        btn.className = "btn btn-primary LogBugButtons";
        btn.style = "font-size: 0.4rem;"
        btn.textContent = "Remove note"
        btn.addEventListener("click", (e) => { this.onRemoveNote(e, rowname, tableId) });
        removeButton.appendChild(btn);
      }
      this.state.Notes.push(noteRef.value)
      noteRef.value = ""
    }
  }

  async populateState() {
      const [user] = await Promise.all([authService.getUser()])
      this.setState({
          userName: user && user.name,
          userId: user.sub,
          Severities: [],
          Loading: true,
          Attachments: [],
          ShowDialog: true
      });
  }

  static renderSeverities(Severities, selectedIndex = 0) {

      let selectsev = Severities.map((severity, i) => {
        if (i === selectedIndex) {
          return <option key={severity.id} selected value={severity.id}>{severity.description}</option>
        } else {
          return <option key={severity.id} value={severity.id}>{severity.description}</option>  
        }
      })

      if (Severities.length > 0) {
            return (
                <FormGroup>
                    <label for="Severities" className= "LogBugLabels">Please indicate how serious the issue is:</label><br />
                    <Input type="select" name="select" id="Severities" className="LogBugButtons" >
                        {selectsev}
                    </Input>
                </FormGroup>
            );
        } else {
          return (
              <select>
                  <option value="1">Loading..</option>
              </select>
          );
        }
    }

    populateSeverities () {

        authService.getAccessToken().then(token =>
            fetch('/api/Severities', { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } }))
            .then(response => response.json())
            .then(response => this.setState({ Severities: response, Loading: false }))

    }

    async submit(e) {
        e.preventDefault();

        let tableRef = document.getElementById("AttachmentList");

        let logformdata = new FormData();
        logformdata.append("ShortDescription", document.getElementById("ShortDescription").value);
        logformdata.append("StepsToRecreate", document.getElementById("StepsToRecreate").value);
        logformdata.append("ExpectedResult", document.getElementById("ExpectedResult").value);
        logformdata.append("ActualResult", document.getElementById("ActualResult").value);
        logformdata.append("LoggedbyId", this.state.userId);
        logformdata.append("AssignToId", '');
        logformdata.append("CurrentStatusId", 1);
        logformdata.append("SeverityId", document.getElementById("Severities").value);
        this.state.Attachments.map(attach => logformdata.append("files", attach));
        this.state.Notes.map(note => logformdata.append("Notes", note));


        authService.getAccessToken().then(token =>
            fetch('/api/Bugs', { method: 'POST', body: logformdata },
              { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } }))
            .then(response => response.json())
            .then(response => {
                this.setState({ Response: response })
                this.setState({ ShowResultDialog: true })

                if (this.state.Response !== null) {

                    if (JSON.parse(JSON.stringify(this.state.Response)).id != null) {
                        this.setState({
                            ModalTitle: "Bug logged!", ModalContent: "Thanks a lot! Your bug id is: "
                                + JSON.parse(JSON.stringify(this.state.Response)).id + " \nbut don't worry you don't have to write it down,\nthe bug will appear on your homepage"
                        })

                        document.getElementById("LogBugForm").reset();
                        this.setState({ Logbug: "Log another bug" })

                        for (var i = tableRef.rows.length - 1; i > 0; i--) {
                            tableRef.deleteRow(i);
                        }

                    } else if (this.state.Response.errors.StepsToRecreate
                      || this.state.Response.errors.ShortDescription
                      || this.state.Response.errors.ExpectedResults
                      || this.state.Response.errors.ActualResult) {
                        this.setState({
                            ModalTitle: "Oops!",
                            ModalContent: "It seems you didn't fill one or more of the following fields:\nSteps to recreate\nExpected Results\nActual Results\nWe need them to log your bug"
                        })

                    }
                }
            })
       
    }

    showDefectModal = () => {
        this.setState({ ShowLogDefectDialog: true });
    };

    hideDefectModal = () => {
        this.setState({ ShowLogDefectDialog: false });
        document.getElementById("home").click()
    };

    showResultModal = () => {
        this.setState({ ShowResultDialog: true });
    };

    hideResultModal = () => {
        this.setState({ ShowResultDialog: false });
    };


    changeTab = (tab) => {
        this.setState({ ActiveTab: tab })
    }

    render() {
        let contents = LogBug.renderSeverities(this.state.Severities);
        let response = this.state.Response

        if (response === null) {
            response = "";
        }

        return (
          <div style={{ height: 'inherit' }}>
                <Form onSubmit={e => this.submit(e)} id="LogBugForm" style={{ width: "inherit", height: '90%' }}> 
                    <Nav tabs>
                        <NavItem className="nav-itemBug">
                            <NavLink className={classnames({ active: this.state.ActiveTab === '1' }, 'nav-linkBug')}
                                onClick={() => { this.changeTab('1'); }}>
                                Description
                            </NavLink>
                        </NavItem>
                        <NavItem className="nav-itemBug">
                            <NavLink className={classnames({ active: this.state.ActiveTab === '2' }, 'nav-linkBug' )}
                                onClick={() => { this.changeTab('2'); }}>
                                Steps to recreate
                            </NavLink>
                        </NavItem>
                        <NavItem className="nav-itemBug">
                            <NavLink className={classnames({ active: this.state.ActiveTab === '3' }, 'nav-linkBug' )}
                                onClick={() => { this.changeTab('3'); }}>
                                Expected vs Actual 
                            </NavLink>
                        </NavItem>
                        <NavItem className="nav-itemBug">
                            <NavLink className={classnames({ active: this.state.ActiveTab === '4' }, 'nav-linkBug' )}
                                onClick={() => { this.changeTab('4'); }}>
                                Severity
                            </NavLink>
                        </NavItem> 
                        <NavItem className="nav-itemBug">
                            <NavLink className={classnames({ active: this.state.ActiveTab === '5'}, 'nav-linkBug' )}
                                onClick={() => { this.changeTab('5'); }}>
                                Attachments
                            </NavLink>
                        </NavItem>   
                        <NavItem className="nav-itemBug">
                          <NavLink className={classnames({ active: this.state.ActiveTab === '6' }, 'nav-linkBug')}
                            onClick={() => { this.changeTab('6'); }}>
                            Notes
                          </NavLink>
                        </NavItem> 
                    </Nav>
                    <TabContent activeTab={this.state.ActiveTab} className= "TabContent">
                        <ShortDescription ExistingText= "" Id= "1"></ShortDescription>
                        <StepsToRecreate ExistingText= "" Id="2"></StepsToRecreate>
                        <ExpectedActual ExistingActualResults="" ExistingExpectedResults="" Id="3"></ExpectedActual>
                        <Severity Id="4" Contents={contents}></Severity>
                        <Attachments Id="5" setFile={this.setFile} onAddAttachment={onAddAttachment} attachmentfiles={this.state.Attachments} NewOrExisting={true}></Attachments>     
                        <Notes Id="6" onAddNote={this.onAddNote} NewOrExisting={true}></Notes>     
                    </TabContent>
                    <div>
                        <button type="submit" name="LogBug" className="btn btn-primary LogBugButtons" style={{ float: 'right', marginTop: '50px' }}>{this.state.Logbug}</button>
                        <Modal isOpen={this.state.ShowResultDialog} toggle={this.hideResultModal} style={{ whiteSpace: 'pre'}}>
                            <ModalHeader style={{ lineheight: "0.15", backgroundColor: "#F05F44", fontSize: "0.7rem" }}><h1 style={{ fontSize: "1.25rem" }}>{this.state.ModalTitle}</h1></ModalHeader>
                            <ModalBody>{this.state.ModalContent}</ModalBody>
                            <ModalFooter>
                                <Button className="btn btn-primary" style={AddattachmentStyling} onClick={this.hideResultModal}>Ok,got it!</Button>{' '}
                            </ModalFooter>
                        </Modal> 
                    </div>
              </Form>
            </div>
        );
    }
}
