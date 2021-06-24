import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ContactTableRow from "./ContactTableRow";
import getURLapi from "../feature/getURLapi.feature";
import Swal from "sweetalert2";
export default class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url_api: getURLapi(),
            contact: []
        };
        this.exportList = this.exportList.bind(this);
    }

    componentDidMount() {
        console.log(this.state.url_api);
        axios
            .get(`${this.state.url_api}/api/contact`)
            .then(res => {
                this.setState({
                    contact: res.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    DataTable() {
        return this.state.contact.map((res, i) => {
            return <ContactTableRow obj={res} key={i} />;
        });
    }

    exportList() {
        window.location.assign(`${this.state.url_api}/api/export-contact`);
    }

    render() {
        return (
            <div className="table-wrapper">
                <Button
                    variant="warning"
                    size="lg"
                    block="block"
                    type="button"
                    onClick={this.exportList}
                >
                    Export List Customer
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{this.DataTable()}</tbody>
                </Table>
            </div>
        );
    }
}
