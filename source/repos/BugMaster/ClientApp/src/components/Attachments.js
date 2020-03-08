import React, { Component } from 'react';
import {  Table } from 'reactstrap';


export class Attachments extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return(
            <div>
                <Table id={this.props.id} style={{ width: '100%' }} >
                    <thead>
                        <tr>
                            <th style={{ fontSize: "0.75rem",padding: "0.15rem" }} >File Name</th>
                            <th>    </th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </Table>            
            
            </div>);
    }
}