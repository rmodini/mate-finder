import React from "react";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";
import axios from "axios";

export default class LocationSearchInputToAddNewLoc extends React.Component {
    constructor(props) {
        super(props);
        this.state = { address: "", latLng: {}, showForm: false };
        console.log("this.state in input", this.state, "pors", this.props);
    }

    handleChange(address) {
        this.setState({ address });
        console.log("this.state in input", this.state, "pors", this.props);
    }

    handleInputChange({ target }) {
        this.setState({
            [target.name]: target.value,
        });
    }

    submit() {
        console.log("this.state submit", this.state);
        axios
            .post("/add-new-loc", {
                address: this.state.address,
                latLng: this.state.latLng,
                name: this.state.name,
                marketType: this.state.marketType,
                mateVar: this.state.mateVar,
                desc: this.state.desc,
            })
            .then((result) => {
                console.log("result from add new loc", result);
                if (result.data.error) {
                    alert("Please insert a correct address");
                } else
                    alert(
                        "Thank you! We will verify your submission and add it shortly!"
                    );
            })
            .catch((e) => {
                console.log("error in add new loc", e);
                alert("Please insert a correct address");
            });
    }

    handleClick() {
        this.setState({ showForm: !this.state.showForm });
        console.log("click", this.state);
    }

    handleSelect(address) {
        geocodeByAddress(address)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
                console.log("Success", latLng);
                this.setState({
                    address,
                    latLng,
                });
                this.props.onSelection(this.state);
            })

            .catch((error) => console.error("Error", error));
    }

    render() {
        return (
            <PlacesAutocomplete
                value={this.state.address}
                onChange={(value) => this.handleChange(value)}
                onSelect={(value) => this.handleSelect(value)}
            >
                {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                }) => (
                    <div>
                        <p>
                            You know a place where they sell mate? Please add it
                            to the map by{" "}
                            <strong onClick={() => this.handleClick()}>
                                clicking here!
                            </strong>{" "}
                            This is a community driven website and we need your
                            help!
                        </p>{" "}
                        {this.state.showForm && (
                            <div>
                                <label>Address</label>
                                <input
                                    name="result-input"
                                    {...getInputProps({
                                        placeholder: "Search Places ...",
                                        className: "location-search-input",
                                    })}
                                />
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map((suggestion) => {
                                        const className = suggestion.active
                                            ? "suggestion-item--active"
                                            : "suggestion-item";
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                            ? {
                                                  backgroundColor: "#fafafa",
                                                  cursor: "pointer",
                                              }
                                            : {
                                                  backgroundColor: "#ffffff",
                                                  cursor: "pointer",
                                              };
                                        return (
                                            <div
                                                {...getSuggestionItemProps(
                                                    suggestion,
                                                    {
                                                        className,
                                                        style,
                                                    }
                                                )}
                                            >
                                                <span>
                                                    {suggestion.description}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <label>Name of shop if known</label>
                                <input
                                    name="name"
                                    onChange={(e) => this.handleInputChange(e)}
                                    autoComplete="off"
                                ></input>
                                <br></br>
                                <label>Type of market if known</label>
                                <select
                                    defaultValue=""
                                    name="marketType"
                                    onChange={(e) => this.handleInputChange(e)}
                                    autoComplete="off"
                                >
                                    <option></option>
                                    <option>African market</option>
                                    <option>Arabic market</option>
                                    <option>Asian market</option>
                                    <option>Latinamerican market</option>
                                    <option>Spanish market</option>
                                    <option>Café/Restaurant</option>
                                    <option>Other</option>
                                </select>
                                <br></br>
                                <label>Yerba Mate variety if known</label>
                                <input
                                    name="mateVar"
                                    onChange={(e) => this.handleInputChange(e)}
                                    autoComplete="off"
                                ></input>
                                <br></br>
                                <label>Description</label>
                                <input
                                    name="desc"
                                    onChange={(e) => this.handleInputChange(e)}
                                    autoComplete="off"
                                ></input>
                                <br></br>
                                <button
                                    onClick={() => this.submit()}
                                    className="submit-new-loc"
                                >
                                    Submit
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}
