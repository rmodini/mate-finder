import React from "react";
import secrets from "../secrets";
import axios from "axios";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import CurrentLocation from "./current-location";
import AddLocation from "./add-location";
import LocationSearchInput from "./autocomplete";
import LocationSearchInputToAddNewLoc from "./autocomplete-to-add";
import ReportModal from "./report-modal";

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false, //Hides or the shows the infoWindow
            activeMarker: {}, //Shows the active marker upon click
            selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
            markers: [],
            possibleShopLoc: {},
            showReportInput: false,
        };
    }

    componentDidMount() {
        axios
            .get("/locations")
            .then((result) => {
                console.log("result from /locations", result);
                this.setState({ markers: result.data });
            })
            .catch((e) => {
                console.log("error in /locations", e);
            });
    }

    handleSelection(propsFromChild) {
        console.log("propsFromChild", propsFromChild);
        this.setState({
            possibleShopLoc: propsFromChild,
        });
        // this.setState((prevState) => ({
        //     markers: [...prevState.markers, propsFromChild],
        // }));
    }

    onMarkerClick(props, marker, e) {
        console.log("marker clicked", props, marker, e);
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
        });
    }
    onClose() {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null,
            });
        }
    }
    getNewLoc(coord) {
        this.setState((prevState) => ({
            markers: [...prevState.markers, coord],
        }));
        console.log("state on map after clik, coord:", coord);
        console.log("this.state on map", this.state);
    }
    handleClick() {
        this.setState({ showReportInput: !this.state.showReportInput });
    }
    render() {
        return (
            <React.Fragment>
                <div className="map-container">
                    <CurrentLocation
                        newCenter={
                            this.state.possibleShopLoc.latLng && {
                                lat: this.state.possibleShopLoc.latLng.lat,
                                lng: this.state.possibleShopLoc.latLng.lng,
                            }
                        }
                        className="map"
                        centerAroundCurrentLocation
                        google={this.props.google}
                    >
                        {this.state.markers &&
                            this.state.markers.map((mark) => (
                                <Marker
                                    key={mark.id}
                                    onClick={(props, marker, e) =>
                                        this.onMarkerClick(props, marker, e)
                                    }
                                    position={{
                                        lat: mark.lat,
                                        lng: mark.lng,
                                    }}
                                    name={mark.address}
                                    other={mark}
                                />
                            ))}
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            onClose={() => this.onClose()}
                        >
                            <div>
                                <h4>{this.state.selectedPlace.name}</h4>

                                {this.state.selectedPlace.other && (
                                    <div>
                                        <p>
                                            {
                                                this.state.selectedPlace.other
                                                    .name
                                            }
                                        </p>
                                        <p>
                                            {
                                                this.state.selectedPlace.other
                                                    .market_type
                                            }
                                        </p>
                                        <p>
                                            {
                                                this.state.selectedPlace.other
                                                    .mate_var
                                            }
                                        </p>
                                        <p>
                                            {
                                                this.state.selectedPlace.other
                                                    .descr
                                            }
                                        </p>
                                    </div>
                                )}
                            </div>
                        </InfoWindow>
                    </CurrentLocation>
                </div>
                <div className="auto-complete">
                    <LocationSearchInput
                        onSelection={(propsFromChild) =>
                            this.handleSelection(propsFromChild)
                        }
                    />
                </div>
                {this.state.showReportInput == false && (
                    <div className="add-new-loc-autocomplete">
                        <LocationSearchInputToAddNewLoc
                            onSelection={(propsFromChild) =>
                                this.handleSelection(propsFromChild)
                            }
                        />
                    </div>
                )}
                <p className="report-btn" onClick={() => this.handleClick()}>
                    Report something / Contact
                </p>
                <div className="report">
                    {this.state.showReportInput && <ReportModal />}
                </div>
            </React.Fragment>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: secrets.GOOGLEMAPS_API_KEY_2,
})(MapContainer);
