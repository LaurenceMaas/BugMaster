import React, { Component } from 'react';
import { Row, Col, TabPane, FormGroup, Input, FormText,Label } from 'reactstrap';
import { AttachmentList } from './AttachmentList';


const AddattachmentStyling = {
    fontSize: "0.4rem",
    marginLeft: '20px',
    marginTop: '20px',
    display: 'inline-block',
}
const LabelStyling = {
    textDecoration: "underline",
    fontSize: "0.75rem"
}

export class Attachments extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TabPane tabId={this.props.Id}>
                <Row>
                    <Col sm="12">
                        <FormGroup>
                            <FormText color="muted">Do you need to add any attachments like a screenshot? Add them here</FormText>
                            <Label for="Attachment" className="LogBugLabels">Attachments:</Label>
                            <div className="container-name">
                                <Input type="file" multiple name="Attachment" id="AttachmentFile" label="Select one or more files" style={{ width: '500px', display: 'inline-block', fontSize: "0.75rem" }} onChange={(e) => { this.props.setFile(e) }} />
                                <button name="AddAttachment" className="btn btn-primary LogBugButtons" style={AddattachmentStyling} onClick={(e) => { this.props.onAddAttachment(e, "AttachmentList", this.props.attachmentfiles) }}>Add Attachments</button>
                            </div>
                        </FormGroup>
                        <AttachmentList id="AttachmentList" TabelId="Attachments"></AttachmentList>
                    </Col>
                </Row>
            </TabPane>
        );
    }
}
