import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';
import { Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Attachments } from './Attachments';

const LogDefectSyling = {
    fontSize: "0.8rem",
    display: 'inline-block',
    width: "auto"
}

const ShortDescriptionStyling = {
    width: "882px",
    fontSize: "0.75rem",
    height: "2.0rem"
}

const StepstoRecreateStyling = {
    width: "882px",
    fontSize: "0.75rem",
    height: "5.0rem"
}

const LabelStyling = {
    textDecoration: "underline",
    fontSize: "0.75rem"
}

const AddattachmentStyling = {
    fontSize: "0.5rem",
    marginLeft: '0px',
    display: 'inline-block',
}

export class LogDefect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: null,
            userId: null,
            Severities: [],
            Loading: true,
            Attachments: [],
            ShowLogDefectDialog: true,
            Response: null,
            ShowResultDialog: false,
            ModalTitle: "",
            ModalContent: "",
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
        console.log("in logdefect componentWillUnmount")
    }

    onDeleteAttachment(e, rowname, tableId) {

        e.preventDefault();
        let rowtoRemove = document.getElementById(rowname)
        let tableToUpdate = document.getElementById(tableId)
        let attachmentToRemove = this.state.Attachments.find(element => element.name === rowtoRemove.cells[0].textContent)

        rowtoRemove.remove();
        this.state.Attachments.splice(this.state.Attachments.indexOf(attachmentToRemove), 1)

        if (tableToUpdate.rows.length === 1) {
            document.getElementById("AttachmentFile").value = ""
        }


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

    onAddAttachment = (e, tableId, files) => {
        e.preventDefault();

        //Get a reference to the table
        let tableRef = document.getElementById(tableId);

        if (tableRef != null) {
            files.map((file) => {
                let isFound = false

                for (var i = 0; i < tableRef.rows.length; i++) {
                    if (tableRef.rows[i].cells[0].textContent === file.name) {
                        isFound = true
                    }

                }

                if (isFound === false) {
                    let newRow = tableRef.insertRow(-1);

                    let fileNameVal = newRow.insertCell(0);
                    fileNameVal.innerHTML = file.name;
                    fileNameVal.style = "font-size: 0.75rem;";

                    let rowname = "removeAttachment" + (tableRef.rows.length - 1)
                    newRow.id = rowname

                    let removeButton = newRow.insertCell(1);
                    var btn = document.createElement(rowname + "button");
                    btn.type = "button";
                    btn.className = "btn btn-primary";
                    btn.style = "font-size: 0.5rem;"
                    btn.textContent = "Remove Attachment"
                    btn.addEventListener("click", (e) => { this.onDeleteAttachment(e, rowname, tableId) });
                    removeButton.appendChild(btn);
                }


            })
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

    static renderSeverities(Severities) {

        let selectsev = Severities.map(severity => (<option key={severity.id} value={severity.id}>{severity.description}</option>));
        if (Severities.length > 0) {
            return (
                <FormGroup>
                    <label for="Severities" style={LabelStyling}>Please indicate how serious the issue is:</label><br />
                    <Input type="select" name="select" id="Severities" style={LogDefectSyling}>
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

    populateSeverities() {

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
        logformdata.append("LoggedbyId", this.state.userId);
        logformdata.append("AssignToId", '');
        logformdata.append("CurrentStatusId", 1);
        logformdata.append("SeverityId", document.getElementById("Severities").value);
        this.state.Attachments.map(attach => logformdata.append("files", attach));

        authService.getAccessToken().then(token =>
            fetch('/api/Defects', { method: 'POST', body: logformdata },
                { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } })).
            then(response => response.json())
            .then(response => {
                this.setState({ Response: response })
                this.setState({ ShowResultDialog: true })

                if (this.state.Response !== null) {

                    if (JSON.parse(JSON.stringify(this.state.Response)).id != null) {
                        this.setState({
                                        ModalTitle: "Bug logged!", ModalContent: "Thanks a lot! Your bug id is: "
                                + JSON.parse(JSON.stringify(this.state.Response)).id + " but don't worry you don't have to write it down, the bug will appear on your homepage"                            
                        })

                        document.getElementById("LogDefectForm").reset(); 
                        this.setState({ Logbug: "Log another bug" })

                        for (var i = tableRef.rows.length-1; i > 0 ; i--) {
                            tableRef.deleteRow(i);
                        }

                    } else if (this.state.Response.errors.StepsToRecreate && this.state.Response.errors.ShortDescription) {
                           
                            this.setState({
                                ModalTitle: "Oops!",
                                ModalContent :"It seems you didn't fill in the steps to recreate nor a description and we need them to log your bug"
                            })
                    } else if (this.state.Response.errors.StepsToRecreate && !this.state.Response.errors.ShortDescription) {

                        this.setState({
                            ModalTitle: "Oops!",
                            ModalContent: "It seems you didn't fill in the steps to recreate and we need them to log your bug"
                        })
                    } else if (!this.state.Response.errors.StepsToRecreate && this.state.Response.errors.ShortDescription) {

                        this.setState({
                            ModalTitle: "Oops!",
                            ModalContent: "It seems you didn't fill in a short description and we need to log your bug"
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

    render() {
        const { userName } = this.state;
        let contents = LogDefect.renderSeverities(this.state.Severities);
        let response = this.state.Response

        if (response === null) {
            response = "";
        }

        return (
            <div>               
                <Modal isOpen={this.state.ShowLogDefectDialog} toggle={this.showDefectModal} style={{ maxWidth: 'max-content', border: "3px solid rgb(240, 95, 68)" }}>
                    <ModalHeader style={{ lineheight: "0.15", backgroundColor: "#F05F44", height: "3.0rem" }}><h1 style={{fontSize:"0.9rem"}}>Sure thing, {userName}</h1></ModalHeader>
                    <ModalBody>
                        <Form onSubmit={e => this.submit(e)} id="LogDefectForm">                           
                            <div>
                                <FormGroup>
                                    <label for="ShortDescription" style={LabelStyling} >Please enter a brief description of what the problem is:</label><br />
                                    <Input type="textarea" name="text" id="ShortDescription" style={ShortDescriptionStyling} />                                    
                                </FormGroup>
                            </div>
                            <div>
                                <FormGroup>
                                    <label for="StepsToRecreate" style={LabelStyling}>Please enter steps to recreate:</label><br />
                                    <Input type="textarea" name="StepsToRecreate" id="StepsToRecreate" style={StepstoRecreateStyling} />
                                </FormGroup>
                            </div>
                            <div>
                                {contents}
                            </div>
                            <div>
                                <FormGroup>
                                    <FormText color="muted">Do you need to add any attachments like a screenshot? Add them here</FormText>
                                    <Label for="Attachment" style={LabelStyling}>Attachments:</Label>
                                    <div className="container-name">
                                        <Input type="file" class="form-control" multiple name="Attachment" id="AttachmentFile" style={{ width: '500px', display: 'inline-block', fontSize: "0.75rem" }} onChange={(e) => { this.setFile(e) }} />
                                        <button name="AddAttachment" className="btn btn-primary" style={AddattachmentStyling} onClick={(e) => { this.onAddAttachment(e, "AttachmentList", this.state.Attachments) }} >Add Attachments</button>
                                    </div>
                                </FormGroup>
                                <Attachments id="AttachmentList" test={this.state.ShowLogDefectDialog} ></Attachments>
                            </div>
                            <ModalFooter>
                                <div>
                                    <button type="submit" name="LogDefect" className="btn btn-primary" style={LogDefectSyling}>{this.state.Logbug}</button>
                                    <button type="button" name="Close" onClick={this.hideDefectModal} className="btn btn-primary" style={LogDefectSyling}>Close</button>
                                    <Modal isOpen={this.state.ShowResultDialog} toggle={this.hideResultModal} style={{ border: "3px solid rgb(240, 95, 68)" }}>
                                        <ModalHeader style={{ lineheight: "0.15", backgroundColor: "#F05F44", fontSize: "0.7rem" }}><h1 style={{ fontSize: "0.9rem" }}>{this.state.ModalTitle}</h1></ModalHeader>
                                        <ModalBody>{this.state.ModalContent}</ModalBody>
                                        <ModalFooter>
                                            <Button className="btn btn-primary" style={AddattachmentStyling} onClick={this.hideResultModal}>Ok,got it!</Button>{' '}
                                        </ModalFooter>
                                    </Modal> 
                                </div>
                            </ModalFooter>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
