import { Row, Col, TabPane, FormGroup, Input } from 'reactstrap';
import './LogBug.css';
import React, { Component } from 'react';

const StepstoRecreateStyling = {
    width: "882px",
    fontSize: "0.75rem",
    height: "5.0rem"
}

const LabelStyling = {
    textDecoration: "underline",
    fontSize: "0.75rem"
}

export class StepsToRecreate extends Component {

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
                                <label for="StepsToRecreate" className="LogBugLabels">Please enter steps to recreate:</label><br />
                                <Input type="textarea" name="StepsToRecreate" id="StepsToRecreate" className="LogBugTextArea" />
                            </FormGroup>
                        </div>
                    </Col>
                </Row>
            </TabPane>
        );
    }
}