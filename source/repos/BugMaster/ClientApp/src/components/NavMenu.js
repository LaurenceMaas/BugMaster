import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoggedinMenu } from './api-authorization/LoggedinMenu';
import './NavMenu.css';


export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Navbar className="inverse navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} id = "home" to="/LineChart"><i className="fas fa-bug"></i> BugMaster</NavbarBrand>                        
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-light" to="/SearchForABug"><i className="fas fa-search"></i>  Search for a bug</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} id="LogDefect" className="text-light" to="/LogBug"><i className="fas fa-plus-circle"></i> Log a bug</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-light" to="/fetch-data"><i className="fas fa-chart-bar"></i> Reports</NavLink>
                                </NavItem>
                                <LoggedinMenu>
                                </LoggedinMenu>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
