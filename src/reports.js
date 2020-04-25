import React from "react";
import axios from "axios";

export default class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.state = { reports: [] };
    }
    componentDidMount() {
        axios
            .get("/reports-adm")
            .then((result) => {
                this.setState({ reports: result.data });
            })
            .catch((e) => {
                console.log("error fetching reports", e);
            });
    }

    handleClick() {
        axios
            .post("/reports-adm")
            .then((result) => {
                this.setState({ reports: [] });
            })
            .catch((e) => {
                console.log("error deleting reports", e);
            });
    }

    render() {
        return (
            <div>
                <h3>Reports and Comments</h3>
                {this.state.reports.length == 0 && (
                    <h4>No reports or comments to review.</h4>
                )}
                {this.state.reports.length != 0 &&
                    this.state.reports.map((rep) => (
                        <div key={rep.id}>
                            <p>
                                <strong>Contact info:</strong> {rep.contact}
                            </p>
                            <p>
                                <strong>Report text:</strong> {rep.text}
                            </p>
                            <p>
                                <strong>Sent on: </strong>
                                {new Date(rep.added_at).toLocaleString()}
                            </p>
                        </div>
                    ))}
                {this.state.reports.length != 0 && (
                    <button
                        onClick={() => {
                            this.handleClick();
                        }}
                    >
                        Delete all
                    </button>
                )}
            </div>
        );
    }
}
