import { Row, Col, TabPane, FormGroup, Input } from 'reactstrap';
import './LogBug.css';
import React, { Component } from 'react';


export class StepsToRecreate extends Component {
  NewOrExistingRender = (ExistingText) => {
    if (ExistingText === "") {
      return (
        <FormGroup>
          <label for="StepsToRecreate" className="LogBugLabels">Please enter steps to recreate:</label><br />
          <Input type="textarea" name="StepsToRecreate" id="StepsToRecreate" className="LogBugTextArea" />
        </FormGroup>)
    } else {
      return (
        <FormGroup>
          <br />
          <Input type="textarea" name="text" id="StepsToRecreate" className="LogBugTextArea" defaultValue={ExistingText} onChange={() => { this.props.onChange("SaveButton", "StepsToRecreate", document.getElementById("StepsToRecreate").value) }} />
       </FormGroup>
      )
    }

  }


  render() {
    let neworexisting = this.NewOrExistingRender(this.props.ExistingText)
    return (
      <TabPane tabId={this.props.Id}>
        <Row>
          <Col sm="12">
            <div>
              <FormGroup>
                {neworexisting}
               </FormGroup>
             </div>
          </Col>
        </Row>
      </TabPane>
    );
  }
}