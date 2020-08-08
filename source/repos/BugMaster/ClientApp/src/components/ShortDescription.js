import { Row, Col,TabPane, FormGroup,Input } from 'reactstrap';
import './LogBug.css';
import React, { Component } from 'react';

export class ShortDescription extends Component {

  NewOrExistingRender = (ExistingText) => {
    if (ExistingText === "") {
      return (
        <FormGroup>
          <label for="ShortDescription" className="LogBugLabels">Please enter a brief description of what the problem is:</label><br />
          <Input type="textarea" name="text" id="ShortDescription" className="LogBugTextArea"/>
        </FormGroup>
      )
    } else {
      return (
        <FormGroup>
          <br />
          <Input type="textarea" name="text" id="ShortDescription" className="LogBugTextArea" defaultValue={ExistingText} onChange={() => { this.props.onChange("SaveButton", "ShortDescription", document.getElementById("ShortDescription").value) }}/>
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
              {neworexisting}
            </div>
          </Col>
        </Row>        
      </TabPane>
    );
  }
}