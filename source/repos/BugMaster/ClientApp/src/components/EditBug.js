import './LogBug.css';
import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, NavLink, NavItem, Nav, TabContent, Form } from 'reactstrap';
import authService from './api-authorization/AuthorizeService';
import { ShortDescription } from './ShortDescription';
import { StepsToRecreate } from './StepsToRecreate';
import { ExpectedActual } from './ExpectedActual';
import { Attachments } from './Attachments';
import { Notes } from './Notes';
import { DropDownItem } from './DropDownItem';
import './LogBug.css';
import { createSelectElementWithDescription } from './Library'
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
      Attachments: [],
      Notes: [],
      Users: [],
      Status:[],
      Loading: true,
      Render: false,
      ShowResultDialog: false
    }
    this.onAddAttachment = this.onAddAttachment.bind(this);
    this.renderExistingFiles = this.renderExistingFiles.bind(this);
    this.SaveBug = this.SaveBug.bind(this);

  }

  componentDidMount() {

    if (this.props.ShowEditDialog === null) {
      this.props.ShowEditDialog = false
    }

    this.changeTab('1')

    authService.getAccessToken().then(token =>
      fetch('/api/Severities', { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } }))
      .then(response => response.json())
      .then(response => this.setState({ Severities: response, Loading: false }))

    authService.getAccessToken().then(token =>
      fetch('/api/Admin', { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } }))
      .then(response => response.json())
      .then(response => this.setState({ Users: response }))

    authService.getAccessToken().then(token =>
      fetch('/api/status', { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } }))
      .then(response => response.json())
      .then(response => this.setState({ Status: response }))

    authService.getAccessToken().then(token =>
      fetch('api/Severities', { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } }))
      .then(response => response.json())
      .then(response => this.setState({ Severities: response }))
  }



  hideResultModal = () => {
    this.setState({ ShowResultDialog: false });
  };

  changeTab = (tab) => {
    this.setState({ ActiveTab: tab })
  }


  setFile = (e) => {
    for (var i = 0; i < e.target.files.length; i++) {
      if (!this.state.Attachments.find(element => element.name === e.target.files[i].name))
      {
        this.state.Attachments.push(e.target.files[i]) 
      }
    } 
  }


  onRemoveNote(e, rowname, tableId) {

    e.preventDefault();
    let rowtoRemove = document.getElementById(rowname)
    let noteToRemove = this.state.Notes.find(element => element.name === rowtoRemove.cells[0].textContent)

    rowtoRemove.remove();
    this.state.Notes.splice(this.state.Notes.indexOf(noteToRemove), 1)
    document.getElementById("SaveButton").style.visibility = "visible";
  }

  RenderExistingNotes = (tableId, Notes) => {
    let tableRef = document.getElementById(tableId);
    let renderednotes = []

    if (Notes) {
      Notes.map((note) => renderednotes.push(note))
      let tableRef = document.getElementById(tableId);
      if (tableRef) {
        tableRef.innerHTML = ""

        var filehead = tableRef.createTHead().insertRow(0).insertCell(0);
        filehead.style = "font-size: 0.75rem;padding: 0.15rem"
        filehead.innerHTML = "<b>Note</b>"
      }
    }
    
    renderednotes.map((note) =>
    {
      if (tableRef != null)
      {
        let newRow = tableRef.insertRow(-1);
        let NoteVal = newRow.insertCell(0);
        if (note instanceof Object) {
          NoteVal.innerHTML = note.text;
        } else {
          NoteVal.innerHTML = note;
        }
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
    }) 
  }

  onAddNote = (tableId, Note, ExistingNotes) => {

    let noteRef = document.getElementById(Note);
    if (noteRef.value !== "") {
      ExistingNotes.push(noteRef.value)

      this.RenderExistingNotes(tableId, ExistingNotes)
      noteRef.value = ""
      document.getElementById("SaveButton").style.visibility = "visible";
    }
  }

  renderExistingFiles = (attachmentfiles, tableId) => {
    let files = []
    if (attachmentfiles) {
      attachmentfiles.map((attachment) => files.push(attachment))
      let tableRef = document.getElementById(tableId);
      if (tableRef) {
        tableRef.innerHTML = ""

        var filehead = tableRef.createTHead().insertRow(0).insertCell(0);
        filehead.style = "font-size: 0.75rem;padding: 0.15rem"
        filehead.innerHTML = "<b>File Name</b>"
      }

      if (files.length > 0) {

        files.map((file) => {
          if (tableRef) {
            let newRow = tableRef.insertRow(-1);

            let fileNameVal = newRow.insertCell(0);
            if (file.fileName) {
              fileNameVal.innerHTML = file.fileName;
            } else {
              fileNameVal.innerHTML = file.name;
            }

            fileNameVal.style = "font-size: 0.75rem;";

            let rowname = "removeAttachment" + (tableRef.rows.length - 1)
            newRow.id = rowname

            let removeButton = newRow.insertCell(1);
            var btn = document.createElement(rowname + "button");
            btn.type = "button";
            btn.className = "btn btn-primary LogBugButtons";
            btn.style = "font-size: 0.4rem;"
            btn.textContent = "Remove Attachment"
            btn.addEventListener("click", (e) => {this.onDeleteAttachment(e, rowname, tableId, this.state.Attachments) });
            removeButton.appendChild(btn);
          }

        })

      }

    }
  }

  onDeleteAttachment = (e, rowname, tableId, files) => {

    let rowtoRemove = document.getElementById(rowname)
    let tableToUpdate = document.getElementById(tableId)
    let attachmentToRemove = null

    for (let i = 0; i < files.length; i++) {
      if ((files[i] instanceof File) && files[i].name === rowtoRemove.cells[0].textContent) {
        attachmentToRemove = files[i]
        break
      } else if (files[i].fileName === rowtoRemove.cells[0].textContent) {
        attachmentToRemove = files[i]
        break
      }
    }

    rowtoRemove.remove();
    files.splice(files.indexOf(attachmentToRemove), 1)

    if (tableToUpdate.rows.length === 1) {
      document.getElementById("AttachmentFile").value = ""
    }    

    document.getElementById("SaveButton").style.visibility = "visible";
  }

  onAddAttachment(e, tableId, files)
  {
    let addedfiles = [];
    files.map((attachment, i) =>
    {
      if ((attachment instanceof File))
      {
        addedfiles[i-1] = attachment
      }

    })

    this.renderExistingFiles(this.state.Attachments, tableId)  
    document.getElementById("SaveButton").style.visibility = "visible";
    document.getElementById("AttachmentFile").value = ""
  }


  BugInfoChanged = (id, changedElement, elementText) => {

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

  hideResultModal = () => {
    this.setState({ ShowResultDialog: false });
  };

  SaveBug()
  {

    let currentattachments = []
    let attachfiletable = document.getElementById("AttachmentList")

    for (var i = 0; i < attachfiletable.rows.length; i++) {
      currentattachments.push(attachfiletable.rows[i].cells[0].textContent)  
    }

    let logformdata = new FormData();

    logformdata.append("Id", this.props.BugInfo.id);
    logformdata.append("LoggedById", this.props.BugInfo.loggedbyId);
    logformdata.append("ShortDescription", document.getElementById("ShortDescription").value);
    logformdata.append("StepsToRecreate", document.getElementById("StepsToRecreate").value);
    logformdata.append("ExpectedResult", document.getElementById("ExpectedResult").value);
    logformdata.append("ActualResult", document.getElementById("ActualResult").value);    
    logformdata.append("SeverityId", document.getElementById("SeveritiesEd").value);
    this.state.Attachments.map(attach => logformdata.append("attachmentstoAdd", attach));
    this.state.Notes.map(note => logformdata.append("Notes", note));
    currentattachments.map(attachment => logformdata.append("attachmentlist", attachment))
    logformdata.append("AssignToId", document.getElementById("AssignedToEd").value);
    logformdata.append("CurrentStatusId", document.getElementById("StatusIdEd").value);          

     authService.getAccessToken().then(token =>
       fetch('/api/Bugs/' + this.props.BugInfo.id, { method: 'PATCH', body: logformdata },
         { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } }))
       .then(response => response.json())
      .then(response => console.log(response))

    document.getElementById("AttachmentFile").value = ""
    document.getElementById("SaveButton").style.visibility = "hidden";
    this.setState({ ShowResultDialog: true });
   }

  static getDerivedStateFromProps(props, state)
  {
    if ((props.BugInfo.id > 0) && props.LoggedBy[0]) {
      state.Attachments = props.BugInfo.attachments
      state.Notes = props.BugInfo.notes

      return {Render: true } 
    }
    else
    {
      return { Render: false };
    }

  }

  render() {
    
    if (this.state.Render === true)
    {
      let assIndx = this.state.Users.map((usr) => { return (usr.id) }).indexOf(this.props.BugInfo.assignToId)

      let Severitycontents = createSelectElementWithDescription(this.state.Severities, "SeveritiesEd", "LogBugButtons", "description", this.props.BugInfo.severityId-1);
      let assignedtoContents = createSelectElementWithDescription(this.state.Users, "AssignedToEd", "LogBugButtons", "userName", assIndx,1);
      let statusContents = createSelectElementWithDescription(this.state.Status, "StatusIdEd", "LogBugButtons", "description", this.props.BugInfo.currentStatusId-1);

      let BugTitle = "Edit bug id:" + this.props.BugInfo.id
      return ( <div>
        <Modal isOpen={this.props.ShowEditDialog} toggle={this.props.ShowEditDialog} className="modal-contentEditBug" >
          <ModalHeader style={{ lineheight: "0.15", backgroundColor: "#F05F44", fontSize: "0.7rem" }}><h1 style={{ fontSize: "1.25rem" }}>{BugTitle}</h1>
          </ModalHeader>          
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
              <NavItem className="nav-itemBug">
                <NavLink className={classnames({ active: this.state.ActiveTab === '5' }, 'nav-linkBug')}
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
              <NavItem className="nav-itemBug">
                <NavLink className={classnames({ active: this.state.ActiveTab === '7' }, 'nav-linkBug')}
              onClick={() => { this.changeTab('7'); }}>
                Assignedto
              </NavLink>
              </NavItem>
              <NavItem className="nav-itemBug">
                <NavLink className={classnames({ active: this.state.ActiveTab === '8' }, 'nav-linkBug')}
              onClick={() => { this.changeTab('8'); }}>
                  Status
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
            <DropDownItem Id="4" Contents={Severitycontents}></DropDownItem>
          </TabContent>
          <TabContent activeTab={this.state.ActiveTab} className="TabContent">
            <Attachments Id="5" setFile={this.setFile} renderExistingFiles={this.renderExistingFiles} onAddAttachment={this.onAddAttachment} attachmentfiles={[]} NewOrExisting={false} ExistingAttachments={this.props.BugInfo.attachments}></Attachments>                  
          </TabContent>
          <TabContent activeTab={this.state.ActiveTab} className="TabContent">
            <Notes Id="6" onAddNote={this.onAddNote} renderExistingNotes={this.RenderExistingNotes} Notes={this.state.Notes} NewOrExisting={false}></Notes> 
          </TabContent>
          <TabContent activeTab={this.state.ActiveTab} className="TabContent">
            <DropDownItem Id="7" Contents={assignedtoContents}></DropDownItem>
          </TabContent>
          <TabContent activeTab={this.state.ActiveTab} className="TabContent">
            <DropDownItem Id="8" Contents={statusContents}></DropDownItem>
          </TabContent>
        </ModalBody>          
          <ModalFooter>            
            <Button id="SaveButton" variant="primary" onClick={this.SaveBug} className="btn btn-primary" style={{ fontSize: "0.5rem", marginLeft: '20px', marginTop: '20px', display: 'inline-block', visibility: 'hidden' }}>Save</Button>{' '}            
            <Button className="btn btn-primary" style={AddattachmentStyling} onClick={this.props.onDeactivateViewBug}>Close</Button>{' '}
          </ModalFooter>
        </Modal> 
        <Modal isOpen={this.state.ShowResultDialog} toggle={this.hideResultModal} style={{ whiteSpace: 'pre' }}>
          <ModalHeader style={{ lineheight: "0.15", backgroundColor: "#F05F44", fontSize: "0.7rem" }}><h1 style={{ fontSize: "1.25rem" }}>Thank you! Your bug is now saved</h1></ModalHeader>
          <ModalFooter>
            <Button className="btn btn-primary" style={AddattachmentStyling} onClick={this.hideResultModal}>Ok,got it!</Button>{' '}
          </ModalFooter>
        </Modal> 
        </div>        
      );
    } else {
      return "";
    }
  }
}