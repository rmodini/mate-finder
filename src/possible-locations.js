import React from "react";
import axios from "axios";
// import secrets from "../secrets";
import CurrentLocation from "./current-location";
import { Marker, GoogleApiWrapper } from "google-maps-react";

export class PossibleLocations extends React.Component {
    constructor(props) {
        super(props);
        this.state = { possibleLocs: [] };
    }
    componentDidMount() {
        axios
            .get("possible-locs-adm")
            .then((result) => {
                this.setState(() => ({
                    possibleLocs: result.data,
                }));
            })
            .catch((e) => {
                console.log("error in possible locs", e);
            });
    }

    showOnMap(latLng) {
        this.setState({ coord: latLng });
    }
    accept(id) {
        axios
            .post("/accept", { id: id })
            .then(() => {
                axios
                    .get("possible-locs-adm")
                    .then((result) => {
                        this.setState(() => ({
                            possibleLocs: result.data,
                        }));
                    })
                    .catch((e) => {
                        console.log("error in possible locs", e);
                    });
            })
            .catch((e) => console.log("error in accept", e));
    }
    decline(id) {
        axios
            .post("/decline", { id: id })
            .then(() => {
                axios
                    .get("possible-locs-adm")
                    .then((result) => {
                        this.setState(() => ({
                            possibleLocs: result.data,
                        }));
                        console.log(this.state);
                    })
                    .catch((e) => {
                        console.log("error in possible locs", e);
                    });
            })
            .catch((e) => console.log("error in decline", e));
    }
    render() {
        return (
            <div>
                <h2>Submissions to moderate</h2>
                <div className="map-container">
                    <CurrentLocation
                        // newCenter={
                        //     this.state.coord && {
                        //         lat: this.state.coord.lat,
                        //         lng: this.state.coord.lng,
                        //     }
                        // }
                        className="map"
                        centerAroundCurrentLocation
                        google={this.props.google}
                        newCenter={
                            this.state.coord && {
                                lat: this.state.coord.lat,
                                lng: this.state.coord.lng,
                            }
                        }
                    >
                        <Marker
                            position={
                                this.state.coord && {
                                    lat: this.state.coord.lat,
                                    lng: this.state.coord.lng,
                                }
                            }
                            name={"Selected submission"}
                        />
                    </CurrentLocation>
                </div>
                {this.state.possibleLocs.length == 0 && (
                    <h3 className="no-submissions">
                        No new submissions to moderate
                    </h3>
                )}
                <div className="submissions">
                    {this.state.possibleLocs.length != 0 &&
                        this.state.possibleLocs.map((loc) => (
                            <div className="border-bot" key={loc.id}>
                                <div>Address: {loc.address}</div>
                                <div>Name: {loc.name}</div>
                                <div>Market Type: {loc.market_type}</div>
                                <div>Yerba Mate Variety: {loc.mate_var}</div>
                                <div>Description: {loc.descr}</div>
                                <div>Uploader: {loc.uploader}</div>
                                <button onClick={() => this.accept(loc.id)}>
                                    Accept
                                </button>{" "}
                                <button onClick={() => this.decline(loc.id)}>
                                    Decline
                                </button>
                                <br></br>
                                <button
                                    onClick={() =>
                                        this.showOnMap({
                                            lat: loc.lat,
                                            lng: loc.lng,
                                        })
                                    }
                                >
                                    Show on map
                                </button>
                                <br></br>
                            </div>
                        ))}
                </div>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    // apiKey: "AIzaSyBzgMK-mz_sovYVlDh5FCNfnK18iQtWeN4",
    apiKey: process.env.GOOGLEMAPS_API_KEY,
    // apiKey: secrets.GOOGLEMAPS_API_KEY_2,
})(PossibleLocations);
