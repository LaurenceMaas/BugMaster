import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div style={{ height: 'inherit' }}>
                <NavMenu />
                <Container style={{ height:'inherit'}}>
                    {this.props.children}
                </Container>
            </div>
        );        
    }
}