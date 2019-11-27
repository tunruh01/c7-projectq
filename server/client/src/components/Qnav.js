import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar'
import { Form, FormControl, Button, Nav, Col, Image } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";



class Qnav extends Component {

    render() {
        return (

            <Router>
                <Navbar bg="light" variant="light">
                    <Link exact to="/"><Navbar.Brand href="/">Project Q</Navbar.Brand></Link>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl size="sm" type="text" placeholder="Search Questions" className="mr-md-2" />
                        <Button variant="outline-secondary mr-1" size="sm">Search</Button>
                        <Col xs={6} md={4}>
                            <Image src="holder.js/171x180" roundedCircle />
                        </Col>
                        <Link exact to="/questions"><Button variant="outline-danger mr-1" size="sm">Ask Question</Button></Link>
                    </Form>
                </Navbar>
            </Router>
        )
    }
}

export default Qnav;
