import React from "react";
import secrets from "../secrets";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import CurrentLocation from "./current-location";
import AddLocation from "./add-location";
import LocationSearchInput from "./autocomplete";

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false, //Hides or the shows the infoWindow
            activeMarker: {}, //Shows the active marker upon click
            selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
            markers: [
                { address: "alex", latLng: { lat: 52.522, lng: 13.4021 } },
                { address: "near alex", latLng: { lat: 52.523, lng: 13.4026 } },
            ],
            possibleShopLoc: {},
        };
        console.log("this.state in map", this.state);
        console.log("this.props in map", this.props);
    }

    handleSelection(propsFromChild) {
        console.log("propsFromChild", propsFromChild);
        this.setState({
            possibleShopLoc: propsFromChild,
        });
        this.setState((prevState) => ({
            markers: [...prevState.markers, propsFromChild],
        }));
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
                    newCenter={
                        this.state.possibleShopLoc.latLng && {
                            lat: this.state.possibleShopLoc.latLng.lat,
                            lng: this.state.possibleShopLoc.latLng.lng,
                        }
                    }
                    className="map"
                    // center={
                    //     this.state.possibleShopLoc.latLng && {
                    //         lat: this.state.possibleShopLoc.latLng.lat,
                    //         lng: this.state.possibleShopLoc.latLng.lng,
                    //     }
                    // }
                    centerAroundCurrentLocation
                    google={this.props.google}
                    // center={{ lat: 20.9640941, lng: 105.8261883 }}
                >
                    {this.state.markers &&
                        this.state.markers.map((mark) => (
                            <Marker
                                key={mark.address + " " + mark.latLng}
                                onClick={(props, marker, e) =>
                                    this.onMarkerClick(props, marker, e)
                                }
                                position={{
                                    lat: mark.latLng.lat,
                                    lng: mark.latLng.lng,
                                }}
                                name={mark.address}
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
                <div className="auto-complete">
                    <LocationSearchInput
                        onSelection={(propsFromChild) =>
                            this.handleSelection(propsFromChild)
                        }
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: secrets.GOOGLEMAPS_API_KEY_2,
})(MapContainer);
