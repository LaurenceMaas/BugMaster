import './LogBug.css';
import React, { Component } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import authService from './api-authorization/AuthorizeService';

export class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      User: null,
      UserName: '',
      TotalBugs: 0,
      TotalNew: 0,
      TotalResolved: 0,
    }
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.GetUserName());
    this.GetUserName();

    authService.getAccessToken().then(token =>
      fetch('/api/Bugs/totalbugs', { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } }))
      .then(response => response.json())
      .then(response => this.setState({ TotalBugs: response }))

    authService.getAccessToken().then(token =>
      fetch('/api/bugs/TotalBugsByStatusID/1', { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } }))
      .then(response => response.json())
      .then(response => this.setState({ TotalNew: response }))

    authService.getAccessToken().then(token =>
      fetch('/api/bugs/TotalBugsByStatusID/2', { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } }))
      .then(response => response.json())
      .then(response => this.setState({ TotalResolved: response }))

    //authService.getAccessToken().then(token =>
    //  fetch('TotalBugsByAssignedToID/' + this.state.User., { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } }))
    //  .then(response => response.json())
    //  .then(response => this.setState({ TotalResolved: response }))

  }

  async GetUserName() {
    const [user] = await Promise.all([authService.getUser()])
    this.setState({ UserName: user && user.name, User: user });
    
  }

  //static getDerivedStateFromProps(props, state) {

  //}

   getIntroOfPage = (label) => {
    if (label === 'Page A') {
      return "Page A is about men's clothing";
    } if (label === 'Page B') {
      return "Page B is about women's dress";
    } if (label === 'Page C') {
      return "Page C is about women's bag";
    } if (label === 'Page D') {
      return 'Page D is about household goods';
    } if (label === 'Page E') {
      return 'Page E is about food';
    } if (label === 'Page F') {
      return 'Page F is about baby food';
    }
  };

  CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
          <p className="intro">{this.getIntroOfPage(label)}</p>
          <p className="desc">Anything you want can be displayed here.</p>
        </div>
      );
    }

    return null;
  };


  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/pb1jwdt1/';

  render() {
    let TotalBugs = this.state.TotalBugs
    let TotalNew = this.state.TotalNew
    let TotalResolved = this.state.TotalResolved
    const data = [
      {
        name: 'Total bugs', uv: TotalBugs, pv: TotalBugs, amt: TotalBugs,
      },
      {
        name: 'New bugs', uv: 50, pv: TotalNew, amt: 2210,
      },
      {
        name: 'Bugs resolved', uv: 2000, pv: TotalResolved, amt: 2290,
      },
      //{
      //  name: 'Bugs In progress', uv: 2780, pv: 3908, amt: 2000,
      //},
      //{
      //  name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
      //},
      //{
      //  name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
      //},
      //{
      //  name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
      //},
    ];

    if (this.state.UserName) {
      return (
        <div>
          <label for="UserStats" className="LogBugLabels">Hi there {this.state.UserName}! <br />
            Your bug stats today are:</label><br />
          <br />
          <BarChart
            width={1000}
            height={300}
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<this.CustomTooltip />} />
            <Legend />
            <Bar dataKey="pv" barSize={20} fill="#F05F44" />
          </BarChart>

        </div>
      );
    } else {
      return "";
    }
  }




 
  
}