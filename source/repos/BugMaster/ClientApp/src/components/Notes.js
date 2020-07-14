import { Row, Col, TabPane, FormGroup, Input, FormText} from 'reactstrap';
import './LogBug.css';
import React, { Component } from 'react';
import { NoteList } from './NoteList';

const AddattachmentStyling = {
  fontSize: "0.4rem",
  marginLeft: '20px',
  marginTop: '20px',
  display: 'inline-block',
  float:'right'
}

export class Notes extends Component {

  render() {
    return (
      <TabPane tabId={this.props.Id}>
        <Row>
          <Col sm="12">
            <div>
              <FormGroup>
                <FormText color="muted"> Need to make a few notes? Make them here </FormText>
                <Input type="textarea" name="text" id="Note" className="LogBugTextArea" />
                <button name="AddNote" className="btn btn-primary LogBugButtons" style={AddattachmentStyling} onClick={(e) => { this.props.onAddNote(e, "NoteList", "Note") }}>Add note</button>
              </FormGroup>
              <NoteList id="NoteList" TabelId="NoteList"></NoteList>
            </div>
          </Col>
        </Row>
      </TabPane>
    );
  }
}