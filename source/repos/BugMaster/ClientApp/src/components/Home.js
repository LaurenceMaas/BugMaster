import './LogBug.css';
import React, { Component } from 'react';
import { LineChart } from './LineChart'; 


export class Home extends Component {

  render() {
    return (
      <div>
        <LineChart></LineChart>
      </div>

    );
  }
}