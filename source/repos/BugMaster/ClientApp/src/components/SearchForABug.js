import React, { Component } from 'react';
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Label } from 'reactstrap';
import './LogBug.css';
import authService from './api-authorization/AuthorizeService';
import { SearchResults } from './SearchResults';


export class SearchForABug extends Component {

    constructor(props) {
        super(props);  

        this.state = {
            Users: [],
            Status: [],
            BugResults: {
          },
          rows: 0
            
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
          let Select = optionData.map(option => (<option key={option.id + 1} value={option.id}>{option[descriptionField]}</option>));
            Select.splice(0, 0, <option key={0} value={0}></option>) 
            return (
              <Input type="select" name={selectId} id={selectId} className={className} style={{ height: '40px' }} >
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

    findBigViaCriteria(event, inputId, criteria) {
      event.preventDefault();
      let input = document.getElementById(inputId);
      let request = ''

      if (criteria === '') {
        request = '/api/Bugs/'  + input.value;
      } else {
        request = '/api/Bugs' + '/' + criteria + '/' + input.value
      }

      authService.getAccessToken().then(token =>
      fetch(request, {
      method: 'GET', headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
      }))
      .then(response => response.json())
      .then(response => { this.setState({ BugResults: response }) })    

  }

    findBigViaOtherCriteria(event) {
      event.preventDefault();
      let inputLoggedBy = document.getElementById("LoggedBy");
      let inputAssignedTo = document.getElementById("AssignedTo");
      let inputStatusId = document.getElementById("StatusId");
      var request

      let inputAssignedToValue = (inputAssignedTo.value === '0') ? "null":inputAssignedTo.value

      //by status only
      if (inputLoggedBy.value === '0' && inputLoggedBy.value === '0' && inputAssignedTo.value === '0' ) {
        request = '/api/Bugs/StatusId/' + inputStatusId.value 
      //by logged by only
      } else if (inputLoggedBy.value !== '0' && inputStatusId.value === '0' && inputAssignedTo.value === '0') {
        request = '/api/Bugs/LoggedBy/' + inputLoggedBy.value 
      //by assigned to only
      } else if (inputAssignedTo.value !== '0' && inputStatusId.value === '0' && inputLoggedBy.value === '0') {
        request = '/api/Bugs/AssignedTo/' + inputAssignedTo.value   
      } else {
        request = '/api/Bugs/Criteria/' + inputLoggedBy.value + '/' + inputStatusId.value + '/' + inputAssignedToValue
      }

      authService.getAccessToken().then(token =>
        fetch(request, {
          method: 'GET', headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        }))
        .then(response => response.json())
        .then(response => { this.setState({ BugResults: response }) })

    }

  ClearCriteria(event)
  {
      event.preventDefault();
      document.getElementById("LoggedBy").value = 0;
      document.getElementById("AssignedTo").value = 0;
      document.getElementById("StatusId").value = 0;
      document.getElementById("BugNo").value = "";
      document.getElementById("shortdescription").value = "";

  }


    render() {
        let statusContents = this.createSelectElementWithDescription(this.state.Status, "StatusId","LogBugButtons","description");
        let assignedtoContents = this.createSelectElementWithDescription(this.state.Users, "AssignedTo", "LogBugButtons","userName");
        let loggedbyContents = this.createSelectElementWithDescription(this.state.Users, "LoggedBy", "LogBugButtons", "userName");

      return (
      
        <Container>          
              <Row xs="1">
              <Col xs="7">
                <Label className="LogBugLabels" style={{textDecoration:'none'}} >If you know your bug id enter it here:</Label>
                <InputGroup> 
                  <InputGroupAddon addonType="prepend" style={{ height: '35px' }}>
                  <InputGroupText style={{ backgroundColor: '#F05F44', fontSize: '0.8rem' }}>Bug Id:</InputGroupText>
                  </InputGroupAddon>
                    <Input id="BugNo" name="BugNo" placeholder="Search.." style={{ height: '35px', fontSize: '0.8rem' }}/>
                  <button type="submit" onClick={(e) => this.findBigViaCriteria(e, "BugNo", "")}  name="SearchForBug" className="btn-primary LogBugButtons" style={{ marginLeft: '0px' }}  ><i className="fas fa-search"></i></button>
                </InputGroup>

                <Label className="LogBugLabels" style={{ textDecoration: 'none' }}>Or....search by a short description:</Label>
                <InputGroup> 
                  <InputGroupAddon addonType="prepend" style={{ height: '35px' }}>
                  <InputGroupText style={{ backgroundColor: '#F05F44', fontSize: '0.8rem'  }}>Short description:</InputGroupText>
                  </InputGroupAddon>
                  <Input style={{ height: '35px' }} id="shortdescription" placeholder="Begin typing.." style={{ height: '35px', fontSize: '0.8rem' }} onKeyUp={(e) => this.findBigViaCriteria(e, "shortdescription", "ShortDescription")}  />
                </InputGroup>

                <br />
                <Label className="LogBugLabels" style={{ textDecoration: 'none' }}>Or....by a combination of the following:</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend" style={{ height: '40px' }}>
                  <InputGroupText style={{ backgroundColor: '#F05F44', fontSize: '0.8rem' }}>Logged by:</InputGroupText>
                  </InputGroupAddon>
                  {loggedbyContents}
                </InputGroup>

                <InputGroup>
                  <InputGroupAddon addonType="prepend" style={{ height: '40px' }}>
                  <InputGroupText style={{ backgroundColor: '#F05F44', fontSize: '0.8rem'  }}>Assigned to:</InputGroupText>
                  </InputGroupAddon>
                  {assignedtoContents}
                </InputGroup>

                <InputGroup>
                  <InputGroupAddon addonType="prepend" style={{ height: '40px' }}>
                  <InputGroupText style={{ backgroundColor: '#F05F44', fontSize: '0.8rem' }}>Status:</InputGroupText>
                  </InputGroupAddon>
                  {statusContents}
                </InputGroup>
                <button type="submit" name="SearchForBug" className="btn-primary LogBugButtons" onClick={(e) => this.findBigViaOtherCriteria(e)} style={{ marginLeft: '0px', marginTop: '10px', height: '35px', width: '45px', float: 'right' }}  ><i className="fas fa-search"></i></button>
                <button type="submit" name="ClearSearch" className="btn-primary LogBugButtons" onClick={(e) => this.ClearCriteria(e)} style={{ marginLeft: '0px', marginTop: '10px', height: '35px', width: '45px', float: 'right', marginRight: '10px' }}  ><i className="fas fa-eraser"></i></button>               
              </Col>
              <Col xs="5">
                  <SearchResults tabledata={this.state.BugResults} ></SearchResults>         
              </Col>
              </Row>
             </Container>
        );
    }

}