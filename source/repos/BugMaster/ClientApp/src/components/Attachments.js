import React, { Component } from 'react';
import { Row, Col, TabPane, FormGroup, Input, FormText,Label } from 'reactstrap';
import { AttachmentList } from './AttachmentList';


const AddattachmentStyling = {
    fontSize: "0.4rem",
    marginLeft: '20px',
    marginTop: '20px',
    display: 'inline-block',
}

export class Attachments extends Component {

  render() {

      let Formtext = ""
      let Labelfor = ""
      if (this.props.NewOrExisting === true) {
        Formtext = <FormText color="muted">Do you need to add any attachments like a screenshot? Add them here</FormText>
        Labelfor = <Label for="Attachment" className="LogBugLabels">Attachments:</Label>
      }

      return (
        <TabPane tabId={this.props.Id}>
          <Row>
            <Col sm="12">
              <FormGroup>
                {Formtext}
                {Labelfor}
                <div className="container-name">
                  <Input type="file" multiple name="Attachment" id="AttachmentFile" label="Select one or more files" style={{ width: '500px', display: 'inline-block', fontSize: "0.75rem" }} onChange={(e) => { this.props.setFile(e) }} />
                  <button name="AddAttachment" className="btn btn-primary LogBugButtons" style={AddattachmentStyling} onClick={(e) => { this.props.onAddAttachment(e, "AttachmentList", this.props.attachmentfiles,"AttachmentFile") }}>Add Attachments</button>
                </div>
              </FormGroup>
              <AttachmentList id="AttachmentList" TabelId="AttachmentList" ExistingAttachments={this.props.ExistingAttachments} renderExistingFiles={this.props.renderExistingFiles} NewOrExisting={this.props.NewOrExisting}></AttachmentList>
            </Col>
          </Row>
        </TabPane>
      );

  }
}
