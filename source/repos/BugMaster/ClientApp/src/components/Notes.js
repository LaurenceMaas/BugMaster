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
  NewOrExistingRender = (NewExiting) => {
    if (NewExiting === true) {
      return (
        <FormText color="muted"> Need to make a few notes? Make them here </FormText>)
    } else {
      return (null)
    }
  }

  NewOrExistingAddRender = (NewExisting) => {
    if (NewExisting === true) {
      return (
        <button name="AddNote" className="btn btn-primary LogBugButtons" style={AddattachmentStyling} onClick={(e) => { this.props.onAddNote(e, "NoteList", "Note") }}>Add note</button>)
    } else {
      return (<button name="AddNote" className="btn btn-primary LogBugButtons" style={AddattachmentStyling} onClick={(e) => { this.props.onAddNote("NoteList", "Note", this.props.Notes) }}>Add note</button>)
    }
  }

  render() {
    let heading = this.NewOrExistingRender(this.props.NewOrExisting)
    let addbutton = this.NewOrExistingAddRender(this.props.NewOrExisting)

    return (
      <TabPane tabId={this.props.Id}>
        <Row>
          <Col sm="12">
            <div>
              {heading}
              <FormGroup>
                <Input type="textarea" name="text" id="Note" className="LogBugTextArea" />
                {addbutton}
              </FormGroup>
              <NoteList id="NoteList" TabelId="NoteList" Notes={this.props.Notes} renderExistingNotes={this.props.renderExistingNotes} NewOrExisting={this.props.NewOrExisting}></NoteList>
            </div>
          </Col>
        </Row>
      </TabPane>
    );
  }
}