import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import axios from "axios";
import ContactsList from "./contact-listing.component";
import Swal from "sweetalert2";
import getURLapi from "../feature/getURLapi.feature";

export default class CreateContact extends Component {
    constructor(props) {
        super(props);

        // Setting up functions
        this.onChangeContactName = this.onChangeContactName.bind(this);
        this.onChangeContactEmail = this.onChangeContactEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            url_api: getURLapi(),
            name: "",
            email: ""
        };
    }

    onChangeContactName(e) {
        this.setState({ name: e.target.value });
    }

    onChangeContactEmail(e) {
        this.setState({ email: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const contact = {
            name: this.state.name,
            email: this.state.email
        };

        if (
            contact.name == "" ||
            contact.name == null ||
            contact.email == "" ||
            contact.email == null
        ) {
            Swal.fire("Oh no!", "Contact Added Failed", "error");
        } else {
            axios
                .post(`${this.state.url_api}/api/contact`, contact)
                .then(() =>
                    Swal.fire(
                        "Good job!",
                        "Contact Added Successfully! Please wait a minute to receive a email!",
                        "success"
                    )
                );
            this.setState({ name: "", email: "" });
        }
    }

    render() {
        return (
            <div className="form-wrapper">
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.name}
                            onChange={this.onChangeContactName}
                        />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.email}
                            onChange={this.onChangeContactEmail}
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        size="lg"
                        block="block"
                        type="submit"
                    >
                        Add Contact
                    </Button>
                </Form>
                <br></br>
                <br></br>

                <ContactsList> </ContactsList>
            </div>
        );
    }
}
