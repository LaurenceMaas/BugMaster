import React, { Component } from 'react';
import {  Table } from 'reactstrap';


export class NoteList extends Component {

    render() {
        return(
            <div>
                <Table id={this.props.id} style={{ width: '80%' }} >
                    <thead>
                        <tr>
                            <th style={{ fontSize: "0.75rem",padding: "0.15rem" }} >Note</th>
                            <th>    </th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </Table>            
            
            </div>);
    }
}