import React, { Component, Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';

export class LoggedinMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: null
        };
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }


    render() {
        const profilePath = `${ApplicationPaths.Profile}`;
        const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
        return this.DisplayTopeMenuBar(profilePath, logoutPath);
    }

    DisplayTopeMenuBar(profilePath, logoutPath) {
        return (<Fragment>
            <NavItem>
                <NavLink tag={Link} className="text-light" to={logoutPath}><i className="fas fa-user-plus"></i> Logout</NavLink>
            </NavItem>
        </Fragment>);

    }

    
}
