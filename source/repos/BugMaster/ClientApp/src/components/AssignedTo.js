import './LogBug.css';
import React, { Component } from 'react';
import { TabPane,Row,Col } from 'reactstrap';

export class AssignedTo extends Component {
  
  render() {
    return (
      <TabPane tabId={this.props.Id}>
        <Row>
          <Col sm="12">
            <label className="LogBugLabels">Assign this bug to a specific user:</label><br />
            {this.props.Contents}
          </Col>
        </Row>
      </TabPane>
    );
  }
}