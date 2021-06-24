import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import getURLapi from "../feature/getURLapi.feature";

export default class EditContact extends Component {
    constructor(props) {
        super(props);

        this.onChangeContactName = this.onChangeContactName.bind(this);
        this.onChangeContactEmail = this.onChangeContactEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // State
        this.state = {
            url_api: getURLapi(),
            name: "",
            email: ""
        };
    }

    componentDidMount() {
        axios
            .get(
                `${this.state.url_api}/api/contact/` +
                    this.props.match.params.id
            )
            .then(res => {
                this.setState({
                    name: res.data.name,
                    email: res.data.email
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    onChangeContactName(e) {
        this.setState({ name: e.target.value });
    }

    onChangeContactEmail(e) {
        this.setState({ email: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const contactObject = {
            name: this.state.name,
            email: this.state.email
        };

        axios
            .put(
                `${this.state.url_api}/api/contact/` +
                    this.props.match.params.id,
                contactObject
            )
            .then(res => {
                console.log(res.data);
                console.log("Contact successfully updated");
            })
            .catch(error => {
                console.log(error);
            });

        // Redirect to Contact List
        this.props.history.push("/contact-listing");
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

                    <Form.Group controlId="Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.email}
                            onChange={this.onChangeContactEmail}
                        />
                    </Form.Group>

                    <Button
                        variant="danger"
                        size="lg"
                        block="block"
                        type="submit"
                    >
                        Update Contact
                    </Button>
                </Form>
            </div>
        );
    }
}
