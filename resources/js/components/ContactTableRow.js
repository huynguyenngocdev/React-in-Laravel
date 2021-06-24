import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";
import getURLapi from "../feature/getURLapi.feature";

export default class ContactTableRow extends Component {
    constructor(props) {
        super(props);
        this.deleteContact = this.deleteContact.bind(this);
        this.state = {
            url_api: getURLapi()
        };
    }

    async deleteContact() {
        await axios
            .delete(`${this.state.url_api}/api/contact/` + this.props.obj.id)
            .then(res => {
                Swal.fire("Good job!", "Contact removed deleted!", "success");
            })
            .catch(error => {
                Swal.fire("Good job!", error, "success");
            });
        window.location.reload();
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.email}</td>
                <td>
                    <Link
                        className="edit-link"
                        to={"/edit-contact/" + this.props.obj.id}
                    >
                        <Button size="sm" variant="info">
                            Edit
                        </Button>
                    </Link>
                    <Button
                        onClick={this.deleteContact}
                        size="sm"
                        variant="danger"
                    >
                        Delete
                    </Button>
                    <Link
                        className="edit-link"
                        to={"/admin-contact/" + this.props.obj.id}
                    >
                        <Button size="sm" variant="success">
                            Mail To Client
                        </Button>
                    </Link>
                </td>
            </tr>
        );
    }
}
