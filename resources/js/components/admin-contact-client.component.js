import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import axios from "axios";
import Swal from "sweetalert2";
import getURLapi from "../feature/getURLapi.feature";

export default class AdminContactClient extends Component {
    constructor(props) {
        super(props);

        this.onChangeContactName = this.onChangeContactName.bind(this);
        this.onChangeContactEmail = this.onChangeContactEmail.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // State
        this.state = {
            url_api: getURLapi(),
            name: "",
            email: "",
            content: "",
            file: null
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

    onChangeContent(e) {
        this.setState({ content: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        const file = document.getElementById("File").files[0];
        console.log(file);
        if (file != undefined && file != null) {
            if (file.size > 25000000) {
                Swal.fire(
                    "File to big",
                    "File to attach in email must less than 25MB. Please choose again",
                    "error"
                );
            } else {
                formData.append("file", file);
                formData.append("content", this.state.content);
                axios
                    .post(
                        `${this.state.url_api}/api/admin-contact/` +
                            this.props.match.params.id,
                        formData
                    )
                    .then(() => {
                        Swal.fire(
                            "Gửi email thành công.",
                            `Đã gửi email cho: ${this.state.name}`,
                            "success"
                        );
                    });
            }
        } else {
            formData.append("file", null);
            formData.append("content", this.state.content);
            axios
                .post(
                    `${this.state.url_api}/api/admin-contact/` +
                        this.props.match.params.id,
                    formData
                )
                .then(() => {
                    Swal.fire(
                        "Gửi email thành công.",
                        `Đã gửi email cho: ${this.state.name}`,
                        "success"
                    );
                });
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
                            readOnly
                        />
                    </Form.Group>

                    <Form.Group controlId="Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.email}
                            onChange={this.onChangeContactEmail}
                            readOnly
                        />
                    </Form.Group>

                    <Form.Group controlId="Content">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={this.onChangeContent}
                            value={this.state.content}
                            placeholder="Content of email"
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="File">
                        <Form.Label>File</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>

                    <Button
                        variant="success"
                        size="lg"
                        block="block"
                        type="submit"
                    >
                        Send Email to Client
                    </Button>
                </Form>
            </div>
        );
    }
}
