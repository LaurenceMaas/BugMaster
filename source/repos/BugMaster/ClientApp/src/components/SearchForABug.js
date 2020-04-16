import React, { Component } from 'react';
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Label,Table } from 'reactstrap';
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
            let Select = optionData.map(option => (<option key={option.id+1} value={option.id+1}>{option[descriptionField]}</option>));
            Select.splice(0, 0, <option key={0} value={0}></option>) 
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

    async findBigViaId(event, inputId, criteria) {
      event.preventDefault();
      let input = document.getElementById(inputId);
      let request = ''

      if (criteria === '') {
        request = '/api/Defects/'  + input.value;
      } else {
        request = '/api/Defects' + '/' + criteria + '/' + input.value
      }

      authService.getAccessToken().then(token =>
        fetch(request, {
      method: 'GET', headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
      }))
      .then(response => response.json())
      .then(response => { this.setState({ BugResults: response })})    
    }

    PopulateResultsTable(tableId, tableData) {

      let tableRef = document.getElementById(tableId);
      console.log("this.state.rows",this.state.rows.)
      if (tableRef !== null) {
        if (tableRef.rows.length > 1) {
          console.log("tableRef.rows.length", tableRef.rows.length)
          for (var i = 1; i < tableRef.rows.length; i++) {
            tableRef.deleteRow(i);
          }
        }
      }

      if (tableRef !== null && Array.isArray(tableData)) {

        tableData.map(buginfo => {
            let newRow = tableRef.insertRow(-1);
            let BugIdVal = newRow.insertCell(0);
            BugIdVal.innerHTML = buginfo.id;
            BugIdVal.style = "font-size: 0.75rem;";

            let BugShortDesVal = newRow.insertCell(1);
            BugShortDesVal.innerHTML = buginfo.shortDescription;
            BugShortDesVal.style = "font-size: 0.75rem;";

          })

        }

        if (tableRef !== null && Number.isInteger(tableData.id) && !Array.isArray(tableData)) {

            let newRow = tableRef.insertRow(-1);
            let BugIdVal = newRow.insertCell(0);
            BugIdVal.innerHTML = tableData.id;
            BugIdVal.style = "font-size: 0.75rem;";

            let BugShortDesVal = newRow.insertCell(1);
            BugShortDesVal.innerHTML = tableData.shortDescription;
            BugShortDesVal.style = "font-size: 0.75rem;";

      }

      this.setState({ rows: tableRef.rows.length})

    }

    render() {
        let statusContents = this.createSelectElementWithDescription(this.state.Status, "StatusId","LogBugButtons","description");
        let assignedtoContents = this.createSelectElementWithDescription(this.state.Users, "AssignedTo", "LogBugButtons","userName");
        let loggedbyContents = this.createSelectElementWithDescription(this.state.Users, "LoggedBy", "LogBugButtons", "userName");
        let CurrentSearchResults = document.getElementById("BugSearchResults")

        return (            
            <Container>
                <Label className="LogBugLabels">Please enter the criteria you wish to search for:</Label>
                <Row xs="1">
                    <Col xs="7">
                        <InputGroup> 
                          <InputGroupAddon addonType="prepend" style={{ height: '35px' }}>
                            <InputGroupText style={{ backgroundColor: '#F05F44', fontSize: '0.8rem' }}>Bug Id:</InputGroupText>
                          </InputGroupAddon>
                            <Input id="BugNo" name="BugNo" placeholder="Search.." style={{ height: '35px', fontSize: '0.8rem' }}/>
                          <button type="submit" onClick={(e) => this.findBigViaId(e, "BugNo", "")}  name="SearchForBug" className="btn-primary LogBugButtons" style={{ marginLeft: '0px' }}  ><i className="fas fa-search"></i></button>
                        </InputGroup>
                        <br/>
                        <InputGroup> 
                            <InputGroupAddon addonType="prepend" style={{ height: '35px' }}>
                              <InputGroupText style={{ backgroundColor: '#F05F44', fontSize: '0.8rem'  }}>Short description:</InputGroupText>
                            </InputGroupAddon>
                            <Input style={{ height: '35px' }} id="shortdescription" onKeyUp={(e) => this.findBigViaId(e, "shortdescription", "ShortDescription")}  />
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend" style={{ height: '35px' }}>
                              <InputGroupText style={{ backgroundColor: '#F05F44', fontSize: '0.8rem'  }}>Logged by:</InputGroupText>
                            </InputGroupAddon>
                            {loggedbyContents}
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend" style={{ height: '35px' }}>
                              <InputGroupText style={{ backgroundColor: '#F05F44', fontSize: '0.8rem'  }}>Assigned to:</InputGroupText>
                            </InputGroupAddon>
                            {assignedtoContents}
                        </InputGroup>

                        <InputGroup>
                            <InputGroupAddon addonType="prepend" style={{ height: '35px' }}>
                              <InputGroupText style={{ backgroundColor: '#F05F44', fontSize: '0.8rem'  }}>Status:</InputGroupText>
                            </InputGroupAddon>
                            {statusContents}
                        </InputGroup>

                        <button type="submit" name="SearchForBug" className="btn btn-primary LogBugButtons" style={{ marginLeft: '0px'}}  ><i className="fas fa-search"></i>  Search</button>

                    </Col>
                    <Col xs="5">
                      <SearchResults tabledata={this.state.BugResults} onChanged={this.PopulateResultsTable}  ></SearchResults>
                    </Col>
                </Row>
             </Container>
        );
    }

}