import { Row, Col, TabPane, FormGroup, Input } from 'reactstrap';
import './LogBug.css';
import React, { Component } from 'react';

export class ExpectedActual extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TabPane tabId={this.props.Id}>
                <Row>
                    <Col sm="12">
                        <div>
                            <FormGroup>
                                <label for="ExpectedResult" className="LogBugLabels">Please explain what you expected to happen</label><br />
                                <Input type="textarea" name="text" id="ExpectedResult" className="LogBugTextArea" />
                                <label for="ActualResult" className="LogBugLabels">Please explain what actually happened</label><br />
                                <Input type="textarea" name="text" id="ActualResult" className="LogBugTextArea" />
                            </FormGroup>
                        </div>
                    </Col>
                </Row>
            </TabPane>
        );
    }
}