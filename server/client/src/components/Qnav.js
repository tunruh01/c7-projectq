import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Nav from "react-bootstrap/Nav";


// Nav.Link under formcontrol was a button, can't tell if that Nav.link works yet
class Qnav extends Component {

    render() {
        return (
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="/">ProjectQ</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-primary">Search</Button>
                    <Button variant="outline-primary">Ask Q</Button>
                </Form>
            </Navbar>
        )
    }

}

export default Qnav;
