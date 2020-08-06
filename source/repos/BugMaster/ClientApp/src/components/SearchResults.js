import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { EditBug } from './EditBug';
import authService from './api-authorization/AuthorizeService';

export class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ShowEditDialog: false,
      BugInfo: {},
      LoggedBy: {},
      RowNum: 0,
      Newshortdescription: "",
      Newstepstorecreate: "",
      Newexpectedresult: "",
      Newactualresult:""
    }

  }

  onActivateViewBug(rowNum) {

    if (rowNum && rowNum > 0)
    {
      this.getBugDetails(rowNum)
      this.setState({ ShowEditDialog: true, RowNum: rowNum })
    }
    
  }

  onDeactivateViewBug = () => {
    this.setState({ ShowEditDialog: false, BugInfo: { id: 0 }, LoggedBy: {} }) 
  }

  PopulateResultsTable(tableId, tableData) {

    let tableRef = document.getElementById(tableId);
    var resultHeader
    var resultHeaderRow
    var resultHeaderText

    if (tableRef !== null) {
      tableRef.innerHTML = "";
      resultHeader = tableRef.createTHead();
      resultHeaderRow = resultHeader.insertRow(0)

      resultHeaderText = resultHeaderRow.insertCell(0)
      resultHeaderText.innerHTML = "BugId"
      resultHeaderText.style = "font-size: 0.75rem;";

      resultHeaderText = resultHeaderRow.insertCell(1)
      resultHeaderText.innerHTML = "Short description"
      resultHeaderText.style = "font-size: 0.75rem;";

    }

    if (tableRef !== null && Array.isArray(tableData)) {

      tableData.map(buginfo => {
        let newRow = tableRef.insertRow(-1);
        let BugIdVal = newRow.insertCell(0);
        BugIdVal.innerHTML = buginfo.id
        BugIdVal.style = "font-size: 0.75rem;";

        let BugShortDesVal = newRow.insertCell(1);
        BugShortDesVal.innerHTML = buginfo.shortDescription;
        BugShortDesVal.style = "font-size: 0.75rem;";

        let editviewButton = newRow.insertCell(2);
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn-primary LogBugButtons";
        btn.style = "font-size: 0.4rem;"
        btn.textContent = "edit/View"
        btn.addEventListener("click", (e) => { this.onActivateViewBug(buginfo.id) });
        editviewButton.appendChild(btn);

      })

    }


    if (tableRef !== null && Number.isInteger(tableData.id) && !Array.isArray(tableData)) {

      let newRow = tableRef.insertRow(-1);
      let BugIdVal = newRow.insertCell(0);
      BugIdVal.innerHTML = tableData.id
      BugIdVal.style = "font-size: 0.75rem;";

      let BugShortDesVal = newRow.insertCell(1);
      BugShortDesVal.innerHTML = tableData.shortDescription;
      BugShortDesVal.style = "font-size: 0.75rem;";

      let editviewButton = newRow.insertCell(2);
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-primary LogBugButtons";
      btn.style = "font-size: 0.4rem;"
      btn.textContent = "edit/View"
      btn.addEventListener("click", (e) => { this.onActivateViewBug(tableData.id) });
      editviewButton.appendChild(btn);

    }

  }

  getBugDetails(bugId)
  {
    let request = '/api/Bugs/' + bugId
    let token = authService.getAccessToken(); 

    token.then(token =>
      fetch(request, {
        method: 'GET', headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
      }))
      .then(response => response.json())
      .then(response => {
        this.setState({ BugInfo: response });
        this.getLoggedBy(response.loggedbyId)
      })

  }

  getLoggedBy(loggedById) {
    let request = "/api/admin/usergid/" + loggedById;
    let token = authService.getAccessToken(); 
    
    fetch(request, {
    method: 'GET', headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    })
    .then(response =>  response.json())
    .then(response => { this.setState({ LoggedBy: response });})
  }


  shouldComponentUpdate()
  {
    if (this.state.BugInfo.isArray) {
      return true
    } else if (this.state.BugInfo !== 0) {
      return true
    } else
    {
      return false
    }
  }

  render() {
    this.PopulateResultsTable("BugSearchResults", this.props.tabledata)
    return (
      <div>
        <Table id="BugSearchResults" style={{ width: '100%' }} onChange={this.PopulateResultsTable("BugSearchResults", this.props.tabledata)} >
        <thead>
          <tr>
            <th style={{ fontSize: "0.75rem", padding: "0.15rem" }}>BugId</th>
            <th style={{ fontSize: "0.75rem", padding: "0.15rem" }}>Short description</th>
            <th style={{ fontSize: "0.75rem", padding: "0.15rem" }}></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </Table>
        <EditBug LoggedBy={this.state.LoggedBy} ShowEditDialog={this.state.ShowEditDialog} BugInfo={this.state.BugInfo} onDeactivateViewBug={this.onDeactivateViewBug} onSave={this.OnSaveClicked}></EditBug>
    </div>
    );
  }

}