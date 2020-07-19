import { Row, Col, TabPane} from 'reactstrap';
import './LogBug.css';
import React, { Component } from 'react';


export class Severity extends Component {

  render() {
        return (
            <TabPane tabId={this.props.Id}>
                <Row>
                    <Col sm="12">
                        {this.props.Contents}
                    </Col>
                </Row>
            </TabPane> 
        );
    }
}