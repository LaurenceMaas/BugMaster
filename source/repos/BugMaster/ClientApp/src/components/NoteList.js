import React, { Component } from 'react';
import {  Table } from 'reactstrap';


export class NoteList extends Component {

  NewOrExisting = (neworexiting) => {
    if (neworexiting === true) {
      
      return (
        <Table id={this.props.id} style={{ width: '80%' }} >
          <thead>
            <tr>
              <th style={{ fontSize: "0.75rem", padding: "0.15rem" }} >Note</th>
              <th>    </th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </Table> )
    } else {

      return (<Table id={this.props.id} style={{ width: '80%' }} onLoad={ this.props.renderExistingNotes(this.props.TabelId, this.props.Notes)} >
        <thead>
          <tr>
            <th style={{ fontSize: "0.75rem", padding: "0.15rem" }} >Note</th>
            <th>    </th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </Table>)
    }
  }

  render() {
    let notetable = this.NewOrExisting(this.props.NewOrExisting)
    return(
      <div>
        {notetable}
      </div>);
    }
}