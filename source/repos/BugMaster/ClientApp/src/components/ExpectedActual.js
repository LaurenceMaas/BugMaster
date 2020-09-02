import { Row, Col, TabPane, FormGroup, Input } from 'reactstrap';
import './LogBug.css';
import React, { Component } from 'react';

export class ExpectedActual extends Component {
  NewOrExistingRender = (ExistingActualResults, ExistingExpectedResults) => {
    if (ExistingExpectedResults === "" && ExistingActualResults === "") {
      return (
        <FormGroup>
          <label for="ExpectedResult" className="LogBugLabels">Please explain what you expected to happen:</label> <br />
          <Input type="textarea" name="text" id="ExpectedResult" className="LogBugTextArea" />
          <label for="ActualResult" className="LogBugLabels">Please explain what actually happened:</label> <br />
          <Input type="textarea" name="text" id="ActualResult" className="LogBugTextArea" />
        </FormGroup>
      )
    } else {
      return (
        <FormGroup>
          <label for="ExpectedResult" className="LogBugLabels">Expected result:</label> 
          <Input type="textarea" name="text" id="ExpectedResult" className="LogBugTextArea" defaultValue={ExistingExpectedResults} onChange={() => { this.props.onChange("SaveButton", "ExpectedResult", document.getElementById("ExpectedResult").value) }} />
          <label for="ActualResult" className="LogBugLabels">Actual result:</label> <br />
          <Input type="textarea" name="text" id="ActualResult" className="LogBugTextArea" defaultValue={ExistingActualResults} onChange={() => { this.props.onChange("SaveButton", "ActualResult", document.getElementById("ActualResult").value) }} />
        </FormGroup>
      )
    }


  }

  render() {
    let neworexisting = this.NewOrExistingRender(this.props.ExistingActualResults, this.props.ExistingExpectedResults)
    return (
    <TabPane tabId={this.props.Id}>
      <Row>
        <Col sm="12">
          <div>
              {neworexisting}
          </div>
        </Col>
      </Row>
     </TabPane>
    );
   }
}