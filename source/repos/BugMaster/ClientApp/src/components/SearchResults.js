import React, { Component } from 'react';
import { Table } from 'reactstrap';

export class SearchResults extends Component {
	constructor(props) {
		super(props);
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

  }

	render() {
    this.PopulateResultsTable("BugSearchResults", this.props.tabledata)
		return (
      <Table id="BugSearchResults" style={{ width: '80%' }} onChange={this.PopulateResultsTable("BugSearchResults", this.props.tabledata)} >
				<thead>
					<tr>
						<th style={{ fontSize: "0.75rem", padding: "0.15rem" }} >BugId</th>
						<th style={{ fontSize: "0.75rem", padding: "0.15rem" }} >Short description</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</Table>
		);
	}

}