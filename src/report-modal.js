import React from "react";
import axios from "axios";

export default class ReportModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value,
        });
    }

    submit() {
        console.log("this.state", this.state);

        axios
            .post("/report", {
                text: this.state.reportText,
                contact: this.state.contact,
            })
            .then((response) => {
                if (response.data.success) {
                    this.setState({ success: true });
                    alert(
                        "Thank you for your report! We will look at it shortly."
                    );
                } else {
                    console.log("error reporting");
                }
            })
            .catch((e) => {
                console.log("error in report", e);
            });
    }

    render() {
        return (
            <div className="report-modal">
                <h3>
                    Do you want to report a bug, problem, false location or
                    something else? Please tell us here:
                </h3>
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="contact"
                    autoComplete="off"
                    defaultValue="Email or contact info (optional)"
                ></input>
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="reportText"
                    autoComplete="off"
                    defaultValue="Insert text here.."
                ></input>
                <button onClick={() => this.submit()}>Send report</button>
            </div>
        );
    }
}
