import React from "react";
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
    render() {
        return (
            <React.Fragment>
                <BrowserRouter>
                    <div className="header">
                        <h2 className="name">
                            <Link className="logo-name" to="/">
                                BuscaMate
                            </Link>
                        </h2>

                        <div className="blank"></div>
                        <div id="nav-bar"></div>
                    </div>
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
