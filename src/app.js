import React from "react";
import axios from "axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import MapContainer from "./map";
import PossibleLocations from "./possible-locations";
import Reports from "./reports";

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
                        <Route exact path="/" component={MapContainer} />
                        <Route
                            exact
                            path="/possible-locs"
                            component={PossibleLocations}
                        />
                        <Route exact path="/reports" component={Reports} />
                    </div>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}
