import React from "react";
// import secrets from "../secrets";
import axios from "axios";
import { InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import CurrentLocation from "./current-location";
import LocationSearchInput from "./autocomplete";
import LocationSearchInputToAddNewLoc from "./autocomplete-to-add";
import ReportModal from "./report-modal";
import en from "../utils/lang/en.json";
import es from "../utils/lang/es.json";

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            markers: [],
            possibleShopLoc: {},
            showReportInput: false,
            lang: {
                en: en,
                es: es,
            },
            currentLang: "es",
            flag: "./imgs/es.png",
        };
    }
    componentDidMount() {
        axios
            .get("/locations")
            .then((result) => {
                this.setState({ markers: result.data });
            })
            .catch((e) => {
                console.log("error in /locations", e);
            });
        axios
            .get("/get-cookie")
            .then((result) => {
                if (result.data.lang) {
                    this.setState({
                        currentLang: result.data.lang,
                        flag: `./imgs/${result.data.lang}.png`,
                    });
                }
            })
            .catch((e) => {
                console.log("error in /locations", e);
            });
    }
    sendLangCookie() {
        axios
            .post("/change-cookie", { currentLang: this.state.currentLang })
            .then(() => {})
            .catch((e) => {
                console.log("error in change cookie", e);
            });
    }
    toggleLang() {
        this.state.currentLang == "en"
            ? (this.setState({ currentLang: "es", flag: "./imgs/es.png" }),
              this.sendLangCookie())
            : (this.setState({
                  currentLang: "en",
                  flag: "./imgs/en.png",
              }),
              this.sendLangCookie());
    }
    handleSelection(propsFromChild) {
        this.setState({
            possibleShopLoc: propsFromChild,
        });
    }
    onMarkerClick(props, marker, e) {
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
    handleClick() {
        this.setState({ showReportInput: !this.state.showReportInput });
    }
    closeModal() {
        this.setState({ showReportInput: false });
    }
    render() {
        return (
            <React.Fragment>
                <div onClick={() => this.toggleLang()}>
                    <img className="lang-flag" src={this.state.flag} />
                </div>
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
                        {this.state.possibleShopLoc.latLng && (
                            <Marker
                                position={{
                                    lat: this.state.possibleShopLoc.latLng.lat,
                                    lng: this.state.possibleShopLoc.latLng.lng,
                                }}
                                name={this.state.possibleShopLoc.name}
                            />
                        )}
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
                                    icon={{
                                        url: "./imgs/mate_icon.svg",
                                        anchor: new google.maps.Point(32, 32),
                                        scaledSize: new google.maps.Size(
                                            32,
                                            32
                                        ),
                                    }}
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
                                        {this.state.selectedPlace.other
                                            .name && (
                                            <p>
                                                {this.state.currentLang == "en"
                                                    ? this.state.lang.en.name
                                                    : this.state.lang.es.name}
                                                {
                                                    this.state.selectedPlace
                                                        .other.name
                                                }
                                            </p>
                                        )}

                                        <p>
                                            {this.state.currentLang == "en"
                                                ? this.state.lang.en.addNewLoc
                                                      .form.market[
                                                      this.state.selectedPlace
                                                          .other.market_type
                                                  ]
                                                : this.state.lang.es.addNewLoc
                                                      .form.market[
                                                      this.state.selectedPlace
                                                          .other.market_type
                                                  ]}
                                        </p>
                                        {this.state.selectedPlace.other
                                            .mate_var && (
                                            <p>
                                                {this.state.currentLang == "en"
                                                    ? this.state.lang.en.mateVar
                                                    : this.state.lang.es
                                                          .mateVar}
                                                {
                                                    this.state.selectedPlace
                                                        .other.mate_var
                                                }
                                            </p>
                                        )}
                                        {this.state.selectedPlace.other
                                            .descr && (
                                            <p className="italic">
                                                {'"'}
                                                {
                                                    this.state.selectedPlace
                                                        .other.descr
                                                }
                                                {'"'}
                                            </p>
                                        )}

                                        {this.state.selectedPlace.other
                                            .uploader && (
                                            <p>
                                                {this.state.currentLang == "en"
                                                    ? this.state.lang.en
                                                          .added_by
                                                    : this.state.lang.es
                                                          .added_by}{" "}
                                                {
                                                    this.state.selectedPlace
                                                        .other.uploader
                                                }{" "}
                                                -{" "}
                                                {new Date(
                                                    this.state.selectedPlace.other.added_at
                                                ).toLocaleDateString("en-GB", {
                                                    day: "numeric",
                                                    month: "numeric",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        )}
                                        {!this.state.selectedPlace.other
                                            .uploader && (
                                            <p>
                                                {this.state.currentLang == "en"
                                                    ? this.state.lang.en
                                                          .added_at
                                                    : this.state.lang.es
                                                          .added_at}{" "}
                                                {new Date(
                                                    this.state.selectedPlace.other.added_at
                                                ).toLocaleDateString("en-GB", {
                                                    day: "numeric",
                                                    month: "numeric",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </InfoWindow>
                    </CurrentLocation>
                </div>
                <div className="auto-complete">
                    <LocationSearchInput
                        search={
                            this.state.currentLang == "en"
                                ? this.state.lang.en.search
                                : this.state.lang.es.search
                        }
                        onSelection={(propsFromChild) =>
                            this.handleSelection(propsFromChild)
                        }
                    />
                </div>
                {this.state.showReportInput == false && (
                    <div className="add-new-loc-autocomplete">
                        <LocationSearchInputToAddNewLoc
                            addNewLoc={
                                this.state.currentLang == "en"
                                    ? this.state.lang.en.addNewLoc
                                    : this.state.lang.es.addNewLoc
                            }
                            onSelection={(propsFromChild) =>
                                this.handleSelection(propsFromChild)
                            }
                        />
                    </div>
                )}
                <p className="report-btn" onClick={() => this.handleClick()}>
                    {this.state.showReportInput && "X"}
                    {!this.state.showReportInput &&
                        (this.state.currentLang == "en"
                            ? this.state.lang.en.report
                            : this.state.lang.es.report)}
                </p>
                <div className="report-modal">
                    {this.state.showReportInput && (
                        <ReportModal
                            reportModal={
                                this.state.currentLang == "en"
                                    ? this.state.lang.en.reportModal
                                    : this.state.lang.es.reportModal
                            }
                            onSubmit={() => this.closeModal()}
                        />
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GM_API_KEY,
})(MapContainer);
