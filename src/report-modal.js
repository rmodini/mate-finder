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
        axios
            .post("/report", {
                text: this.state.reportText,
                contact: this.state.contact,
            })
            .then((response) => {
                if (response.data.success) {
                    this.setState({ success: true });
                    alert(this.props.reportModal.success);
                    this.props.onSubmit();
                } else {
                    console.log("error reporting");
                    alert(this.props.reportModal.error);
                }
            })
            .catch((e) => {
                console.log("error in report", e);
                alert(this.props.reportModal.error);
            });
    }

    render() {
        return (
            <div>
                <h3>{this.props.reportModal.text}</h3>
                <input
                    className="report-contact"
                    onChange={(e) => this.handleChange(e)}
                    name="contact"
                    autoComplete="off"
                    maxLength="50"
                    placeholder={this.props.reportModal.contact}
                ></input>
                <br></br>
                <input
                    className="report-input"
                    onChange={(e) => this.handleChange(e)}
                    name="reportText"
                    autoComplete="off"
                    maxLength="255"
                    placeholder={this.props.reportModal.inputText}
                ></input>
                <br></br>
                <button onClick={() => this.submit()}>
                    {this.props.reportModal.submit}
                </button>
            </div>
        );
    }
}
