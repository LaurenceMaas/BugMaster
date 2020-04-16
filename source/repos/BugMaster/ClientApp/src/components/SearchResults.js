import React, { Component } from 'react';
import { Table } from 'reactstrap';

export class SearchResults extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<Table id="BugSearchResults" style={{ width: '80%' }} onChanged={this.props.onChanged("BugSearchResults", this.props.tabledata)} >
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