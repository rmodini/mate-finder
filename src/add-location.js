import React from "react";

export default class AddLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log("this.state in add-loc", this.state);
        console.log("this.props in add-loc", this.props);
    }
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value,
        });
    }
    submitNewLoc() {
        this.props.getNewLoc({
            latLng: { lat: 52.5218, lng: 13.4018 },
            name: this.state.submitBtn,
        });
        console.log("this submit", this.state);
    }
    render() {
        return (
            <div className="add-loc">
                <h3>Add new Location</h3>
                <input
                    name="submitBtn"
                    onChange={(e) => this.handleChange(e)}
                ></input>
                <button onClick={() => this.submitNewLoc()}>Submit</button>
            </div>
        );
    }
}
