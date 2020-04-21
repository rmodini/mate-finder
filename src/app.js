import React from "react";
import axios from "axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Map from "./map";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        // axios
        //     .get("/user")
        //     .then((result) => {
        //         // console.log("result from axios get user", result);
        //         this.setState({
        //             id: result.data.id,
        //             first: result.data.first,
        //             last: result.data.last,
        //             imgUrl: result.data.img_url,
        //             bio: result.data.bio,
        //             // add bio etc
        //         });
        //         // console.log("this.state", this.state);
        //         let profPic = document.getElementsByClassName("profile-pic");
        //         for (let i = 0; i < profPic.length; i++) {
        //             profPic[i].addEventListener("error", () => {
        //                 console.log("eror on img");
        //                 profPic[i].setAttribute(
        //                     "src",
        //                     "/images/default_banana.gif"
        //                 );
        //             });
        //         }
        //     })
        //     .catch((e) => {
        //         console.log("error in axios get user", e);
        //     });
    }

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
                        <Route path="/" component={Map} />
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
