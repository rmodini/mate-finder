import React from "react";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";

export default class LocationSearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { address: "", latLng: {} };
    }

    handleChange(address) {
        this.setState({ address });
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
                        <strong>{this.props.search.text}</strong>
                        <div>
                            <input
                                name="result-input"
                                maxLength="100"
                                {...getInputProps({
                                    placeholder: this.props.search.inputText,
                                    className: "location-search-input",
                                })}
                            />
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map((suggestion) => {
                                    const className = suggestion.active
                                        ? "suggestion-item--active"
                                        : "suggestion-item";
                                    const style = suggestion.active
                                        ? {
                                              backgroundColor: "#e0e0e0",
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
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}
