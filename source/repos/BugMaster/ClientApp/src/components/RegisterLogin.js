import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { ApplicationPaths } from './api-authorization/ApiAuthorizationConstants';


var LandingPageStyle = {
    width: "100%",
    height: "750px",
    backgroundImage: "url(https://cryptonewsgazette.com/wp-content/uploads/2019/11/Bug-Tracking-Software-700x400.png)",
    backgroundPosition: "center",
    backgroundRepeat: "repeat",
    backgroundSize: "cover"
};

var SectionStyle = {
    top: "55%",
    right: "1%"
};

export class RegisterLogin extends Component {

    render() {
        const registerPath = `${ApplicationPaths.Register}`;
        const loginPath = `${ApplicationPaths.Login}`;
        return (
        <div style={LandingPageStyle}>
            <header className="text-center col-12">
                <h1 className="text-uppercase" color="white"><p>Bug Master</p></h1>
                <h1 className="text-uppercase" color="white"><p>Managing defects since 2020</p></h1>
            </header>

            <section className="text-center col-12" style={SectionStyle}>
                <button className="btn btn-primary btn-xl"><Link to={registerPath}>Register</Link></button>
                <button className="btn btn-primary btn-xl"><Link to={loginPath}>Login</Link></button>
            </section>

                {this.props.children}

         </div>

        );
        
    }
}
