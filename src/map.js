import React from "react";
import secrets from "../secrets";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import CurrentLocation from "./current-location";

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false, //Hides or the shows the infoWindow
            activeMarker: {}, //Shows the active marker upon click
            selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
        };
        console.log("this.state", this.state);
        console.log("this.props", this.props);
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
    render() {
        return (
            <CurrentLocation
                centerAroundCurrentLocation
                google={this.props.google}
            >
                <Marker
                    onClick={(props, marker, e) =>
                        this.onMarkerClick(props, marker, e)
                    }
                    name={"Berlin Charlottenburg"}
                />
                <Marker
                    onClick={(props, marker, e) =>
                        this.onMarkerClick(props, marker, e)
                    }
                    position={{ lat: 52.522, lng: 13.4021 }}
                    name={"Berlin Alex"}
                />
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
        );
    }
}
const containerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
};
const style = {
    width: "80%",
    height: "80%",
};

export default GoogleApiWrapper({
    apiKey: secrets.GOOGLEMAPS_API_KEY,
})(MapContainer);
