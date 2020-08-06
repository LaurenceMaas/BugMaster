import React, { Component } from 'react';
import {  Table } from 'reactstrap';


export class AttachmentList extends Component {

  NewOrExisting = (neworexiting) => {
    if (neworexiting === false) {
      return (<Table id={this.props.id} style={{ width: '80%' }} onLoad={this.props.renderExistingFiles(this.props.ExistingAttachments, this.props.TabelId)} >
        <thead>
          <tr>
            <th style={{ fontSize: "0.75rem", padding: "0.15rem" }} >File Name</th>
            <th>    </th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </Table>  )
    } else {
      return (<Table id={this.props.id} style={{ width: '80%' }}  >
        <thead>
          <tr>
            <th style={{ fontSize: "0.75rem", padding: "0.15rem" }} >File Name</th>
            <th>    </th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </Table>)
    }

  }

  render() {
    
    let render = this.NewOrExisting(this.props.NewOrExisting)

    return(
      <div>
        {render}            
      </div>);
   }
} 