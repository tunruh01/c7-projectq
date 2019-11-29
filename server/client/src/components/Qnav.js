import React, { Component } from "react";
import "../App.css";
import Navbar from 'react-bootstrap/Navbar'
import { Form, FormControl, Button, Nav, Image } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";



class Qnav extends Component {

    render() {
        return (

                <Navbar bg="light" variant="light">
                    <Navbar.Brand>Project Q</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl size="sm" type="text" placeholder="Search Questions" className="col-xs-6 mr-1" />
                        <Button variant="outline-secondary mr-3" size="sm">Search</Button>
                    </Form>
                    <Form inline>
                        <Link exact to="/question"><Button variant="outline-danger mr-3" size="sm">Ask Question</Button></Link>
                        <Image src="https://s3.amazonaws.com/creativetim_bucket/new_logo.png" roundedCircle />
                    </Form>
                </Navbar>
        )
    }
}

export default Qnav;
