import React from "react";
import secrets from "../secrets";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import Autocomplete from "react-places-autocomplete";
import CurrentLocation from "./current-location";
import AddLocation from "./add-location";

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false, //Hides or the shows the infoWindow
            activeMarker: {}, //Shows the active marker upon click
            selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
            markers: [
                { name: "alex", position: { lat: 52.522, lng: 13.4021 } },
                { name: "near alex", position: { lat: 52.523, lng: 13.4026 } },
            ],
            address: "",
            city: "",
            area: "",
            state: "",
            mapPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng,
            },
            markerPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng,
            },
        };
        console.log("this.state in map", this.state);
        console.log("this.props in map", this.props);
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
    render() {
        return (
            <React.Fragment>
                <CurrentLocation
                    className="map"
                    centerAroundCurrentLocation
                    google={this.props.google}
                >
                    {this.state.markers &&
                        this.state.markers.map((mark) => (
                            <Marker
                                key={mark.name}
                                onClick={(props, marker, e) =>
                                    this.onMarkerClick(props, marker, e)
                                }
                                position={{
                                    lat: mark.position.lat,
                                    lng: mark.position.lng,
                                }}
                                name={mark.name}
                            />
                        ))}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={() => this.onClose()}
                    >
                        <div>
                            <h4>{this.state.selectedPlace.name}</h4>
                        </div>
                    </InfoWindow>
                </CurrentLocation>
                <AddLocation getNewLoc={(coord) => this.getNewLoc(coord)} />
            </React.Fragment>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: secrets.GOOGLEMAPS_API_KEY,
})(MapContainer);
