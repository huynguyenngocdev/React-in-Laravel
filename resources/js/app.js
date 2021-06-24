import React from "react";
import ReactDOM from "react-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import EditContact from "./components/edit-contact.component";
import ContactsList from "./components/contact-listing.component";
import CreateContact from "./components/create-contact.component";
import AdminContact from "./components/admin-contact-client.component";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Navbar>
                        <Container>
                            <Navbar.Brand>
                                <Link to={"/"} className="nav-link">
                                    Contact manager
                                </Link>
                            </Navbar.Brand>

                            <Nav className="justify-content-end">
                                <Nav>
                                    <Link
                                        to={"/contacts-listing"}
                                        className="nav-link"
                                    >
                                        Contacts List
                                    </Link>
                                </Nav>
                            </Nav>
                        </Container>
                    </Navbar>
                </header>

                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="wrapper">
                                <Switch>
                                    <Route
                                        exact
                                        path="/"
                                        component={CreateContact}
                                    />
                                    <Route
                                        path="/edit-contact/:id"
                                        component={EditContact}
                                    />
                                    <Route
                                        path="/contacts-listing"
                                        component={ContactsList}
                                    />
                                    <Route
                                        path="/admin-contact/:id"
                                        component={AdminContact}
                                    />
                                </Switch>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Router>
    );
}

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
