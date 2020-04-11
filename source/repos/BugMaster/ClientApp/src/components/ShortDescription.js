import { Row, Col,TabPane, FormGroup,Input } from 'reactstrap';
import './LogBug.css';
import React, { Component } from 'react';

export class ShortDescription extends Component {

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
                                <label for="ShortDescription" className="LogBugLabels">Please enter a brief description of what the problem is:</label><br />
                                <Input type="textarea" name="text" id="ShortDescription" className="LogBugTextArea" />
                            </FormGroup>
                        </div>
                    </Col>
                </Row>
            </TabPane>
        );
    }
}