import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { RegisterLogin } from './components/RegisterLogin';
import { LineChart } from './components/LineChart';
import { LogBug } from './components/LogBug';
import { EditBug } from './components/EditBug';
import { SearchForABug } from './components/SearchForABug';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import authService from './components/api-authorization/AuthorizeService';
import './custom.css';


export default class App extends Component
{
    static displayName = App.name;
    constructor()
    {
        super();
        this.state =
            {
                isAuthenticated: false,
                userName: null
            };
        
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

   async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
    }

    render()
    {
        const { isAuthenticated } = this.state;
        return isAuthenticated === true ?
          <Layout>
            <Route path='/LineChart' component={LineChart} />
                <Route path='/LogBug' component={LogBug} />
                <Route path='/SearchForABug' component={SearchForABug} />
                <Route path='/Editbug' component={EditBug} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            </Layout> :
            <RegisterLogin>
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            </RegisterLogin>
    }

}

