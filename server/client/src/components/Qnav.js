import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router, Link } from "react-router-dom";


// Nav.Link under formcontrol was a button, can't tell if that Nav.link works yet
class Qnav extends Component {

    render() {
        return (
            <Router>
                <Navbar bg="light" variant="light">
                    <Link exact to="/"><Navbar.Brand href="/">ProjectQ</Navbar.Brand></Link>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-primary">Search</Button>
                        <Link exact to="/questions"><Button variant="outline-primary">Ask Q</Button></Link>
                    </Form>
                </Navbar>
            </Router>
        )
    }

}

export default Qnav;
