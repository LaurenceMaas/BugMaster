import React, { Component } from 'react';
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Label,Table } from 'reactstrap';
import './LogBug.css';
import authService from './api-authorization/AuthorizeService';

export class SearchForABug extends Component {

    constructor(props) {
        super(props);  

        this.state = {
            Users: [],
            Status: [],
            BugResults: []
        }
    }

    componentDidMount() {
        this.populateStatus()
        this.populateUsers()
    }

    populateStatus() {
        authService.getAccessToken().then(token =>
            fetch('/api/status', { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } }))
            .then(response => response.json())
            .then(response => this.setState({ Status: response }))

    }

    populateUsers() {

        authService.getAccessToken().then(token =>
            fetch('/api/Admin', { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } }))
            .then(response => response.json())
            .then(response => this.setState({ Users: response}))
    }

    renderUsers(e,SelectId) {
        e.preventDefault();
        authService.getAccessToken().then(token =>
            fetch('/api/Admin', { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } }))
            .then(response => response.json())
            .then(response => this.setState({ Users: response }))

        let selecttopopulate = document.getElementById(SelectId)
        selecttopopulate.length = 0;


        this.state.Users.map(user => this.creatOption(user.userName,selecttopopulate))
    }

    createSelectElementWithDescription(optionData, selectId, className, descriptionField) {
        if (optionData.length > 0) {
            let Select = optionData.map(option => (<option key={option.id} value={option.id}>{option[descriptionField]}</option>));
            return (
                <Input type="select" name={selectId} id={selectId} className={className} >
                    {Select}
                </Input>
            );
        } else {
            return (
                <select>
                    <option value="1">Loading..</option>
                </select>
            );
        }
    }


    render() {
        let statusContents = this.createSelectElementWithDescription(this.state.Status, "StatusId","LogBugButtons","description");
        let assignedtoContents = this.createSelectElementWithDescription(this.state.Users, "AssignedTo", "LogBugButtons","userName");
        let loggedbyContents = this.createSelectElementWithDescription(this.state.Users, "LoggedBy", "LogBugButtons", "userName");

        return (            
            <Container>
                <Label className="LogBugLabels">Please enter the criteria you wish to search for:</Label>
                <Row xs="1">
                    <Col xs="7">
                        <InputGroup> 
                            <InputGroupAddon addonType="prepend" style={{ height: '35px' }}>
                                <InputGroupText style={{ backgroundColor: '#F05F44' }}>Bug Id:<i className="fas fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Search.." style={{ height: '35px' }} />
                        </InputGroup> 
                        <InputGroup> 
                            <InputGroupAddon addonType="prepend" style={{ height: '35px' }}>
                                <InputGroupText style={{ backgroundColor: '#F05F44' }}><i className="fas fa-bug"></i>Short description:</InputGroupText>
                            </InputGroupAddon>
                            <Input style={{ height: '35px' }} />
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend" style={{ height: '35px' }}>
                                <InputGroupText style={{ backgroundColor: '#F05F44' }}    ><i className="fas fa-bug"></i>Logged by:</InputGroupText>
                            </InputGroupAddon>
                            {loggedbyContents}
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend" style={{ height: '35px' }}>
                                <InputGroupText style={{ backgroundColor: '#F05F44' }}><i className="fas fa-bug"></i>Assigned to:</InputGroupText>
                            </InputGroupAddon>
                            {assignedtoContents}
                        </InputGroup>

                        <InputGroup>
                            <InputGroupAddon addonType="prepend" style={{ height: '35px' }}>
                                <InputGroupText style={{ backgroundColor: '#F05F44' }}><i className="fas fa-bug"></i>Status:</InputGroupText>
                            </InputGroupAddon>
                            {statusContents}
                        </InputGroup>

                        <button type="submit" name="SearchForBug" className="btn btn-primary LogBugButtons" style={{ marginLeft: '0px'}}  ><i className="fas fa-search"></i>  Search</button>

                    </Col>
                    <Col xs="5">
                        <Table id="BugSearchResults" style={{ width: '80%' }} >
                            <thead>
                                <tr>
                                    <th style={{ fontSize: "0.75rem", padding: "0.15rem" }}>Results</th>
                                    <th>    </th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
             </Container>
        );
    }

}