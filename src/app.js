import React from "react";
import axios from "axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import MapContainer from "./map";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {}

    // in react, siblings cant share data (only through they parent)
    render() {
        return (
            <React.Fragment>
                <BrowserRouter>
                    <div className="header">
                        <Link className="logo-name" to="/">
                            <h3 className="name">Mate Finder</h3>
                        </Link>
                        <div className="blank"></div>
                        <div id="nav-bar">
                            {/* <Link className="button" to="/find/users">
                                Find People
                            </Link>
                            <Link className="button" to="/chat">
                                Shoutbox
                            </Link> */}
                        </div>
                    </div>
                    {/* any patter in the path in react router should never match a patch in the express router
                        (that we we use .json at the end on the express) */}
                    {/* use render instead of component to pass it data */}
                    <div className="content">
                        <Route path="/" component={MapContainer} />

                        {/* <Route
                            exact
                            path="/prof-initialroute"
                            render={() => (
                                <Profile
                                    first={this.state.first}
                                    last={this.state.last}
                                    imgUrl={this.state.imgUrl}
                                    bio={this.state.bio}
                                    setBio={this.setBio}
                                />
                            )}
                        />
                        <Route
                            path="/user/:id"
                            render={(props) => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                        <Route path="/find/users" component={FindPeople} />
                        <Route exact path="/chat" component={Chat} /> */}
                    </div>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}
