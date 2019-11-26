import React, { Component } from "react";
import QuestionList from './QuestionList'
import Navbar from 'react-bootstrap/Navbar'
import { Form, FormControl, Button, Nav } from "react-bootstrap";


// Nav.Link under formcontrol was a button, can't tell if that Nav.link works yet
class Qnav extends Component {

    render() {
        return (
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="#home">ProjectQ</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-primary">Search</Button>
                </Form>
            </Navbar>
        )
    }
}

export default Qnav;
