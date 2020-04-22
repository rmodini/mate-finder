import React from "react";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";

export default class LocationSearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { address: "" };
        console.log("this.state in input", this.state, "pors", this.props);
    }

    handleChange(address) {
        this.setState({ address });
        console.log("this.state in input", this.state, "pors", this.props);
    }

    handleSelect(address) {
        geocodeByAddress(address)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => console.log("Success", latLng))
            .catch((error) => console.error("Error", error));
        this.setState({ address });
        console.log("handleselect clicked", address);
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
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                        {suggestions.length == 0 && (
                            <div>
                                <p>Address selected:</p>{" "}
                                <p>{this.state.address}</p>
                            </div>
                        )}
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}
