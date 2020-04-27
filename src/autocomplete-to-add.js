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
    }

    handleChange(address) {
        this.setState({ address });
    }

    handleInputChange({ target }) {
        this.setState({
            [target.name]: target.value,
        });
    }

    handleSelectChange({ target }) {
        let marketTypes = this.props.addNewLoc.form.market;
        for (let key in marketTypes) {
            if (marketTypes[key] == target.value) {
                this.setState({
                    [target.name]: key,
                });
            }
        }
    }

    submit() {
        axios
            .post("/add-new-loc", {
                address: this.state.address,
                latLng: this.state.latLng,
                name: this.state.name,
                marketType: this.state.marketType,
                mateVar: this.state.mateVar,
                desc: this.state.desc,
                uploader: this.state.uploader,
            })
            .then((result) => {
                if (result.data.error) {
                    alert(this.props.addNewLoc.form.error);
                } else {
                    alert(this.props.addNewLoc.form.success);
                    this.setState({ showForm: !this.state.showForm });
                }
            })
            .catch((e) => {
                console.log("error in add new loc", e);
                alert(this.props.addNewLoc.form.error);
            });
    }

    handleClick() {
        this.setState({ showForm: !this.state.showForm });
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
                    <div className="input-wrap">
                        <p>
                            {this.props.addNewLoc.text1}
                            <strong
                                className="add-loc-btn"
                                onClick={() => this.handleClick()}
                            >
                                {this.props.addNewLoc.textStrong}
                            </strong>
                            {this.props.addNewLoc.text2}
                        </p>{" "}
                        {this.state.showForm && (
                            <div className="add-loc-form">
                                <div>{this.props.addNewLoc.form.title}</div>
                                <input
                                    name="result-input"
                                    maxLength="100"
                                    {...getInputProps({
                                        placeholder: this.props.addNewLoc.form
                                            .address,
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
                                <input
                                    placeholder={this.props.addNewLoc.form.name}
                                    name="name"
                                    onChange={(e) => this.handleInputChange(e)}
                                    autoComplete="off"
                                    maxLength="25"
                                ></input>
                                <br></br>
                                <select
                                    defaultValue={
                                        this.props.addNewLoc.form.market.type
                                    }
                                    name="marketType"
                                    onChange={(e) => this.handleSelectChange(e)}
                                    autoComplete="off"
                                >
                                    <option>
                                        {this.props.addNewLoc.form.market.type}
                                    </option>
                                    <option>
                                        {this.props.addNewLoc.form.market.af}
                                    </option>
                                    <option>
                                        {this.props.addNewLoc.form.market.ar}
                                    </option>
                                    <option>
                                        {this.props.addNewLoc.form.market.as}
                                    </option>
                                    <option>
                                        {this.props.addNewLoc.form.market.la}
                                    </option>
                                    <option>
                                        {this.props.addNewLoc.form.market.sp}
                                    </option>
                                    <option>
                                        {this.props.addNewLoc.form.market.ca}
                                    </option>
                                    <option>
                                        {this.props.addNewLoc.form.market.ot}
                                    </option>
                                </select>
                                <br></br>
                                <input
                                    placeholder={this.props.addNewLoc.form.var}
                                    name="mateVar"
                                    onChange={(e) => this.handleInputChange(e)}
                                    autoComplete="off"
                                    maxLength="60"
                                ></input>
                                <br></br>
                                <input
                                    placeholder={this.props.addNewLoc.form.desc}
                                    name="desc"
                                    onChange={(e) => this.handleInputChange(e)}
                                    autoComplete="off"
                                    maxLength="70"
                                ></input>
                                <br></br>
                                <input
                                    placeholder={
                                        this.props.addNewLoc.form.uploader
                                    }
                                    name="uploader"
                                    onChange={(e) => this.handleInputChange(e)}
                                    autoComplete="off"
                                    maxLength="25"
                                ></input>
                                <br></br>
                                <button
                                    onClick={() => this.submit()}
                                    className="submit-new-loc"
                                >
                                    {this.props.addNewLoc.form.submit}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}
