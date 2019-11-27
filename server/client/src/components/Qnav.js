import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar'
import { Form, FormControl, Button, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";



class Qnav extends Component {

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <NavLink to="/"><Navbar.Brand>Project Q</Navbar.Brand></NavLink>
                <Nav className="mr-auto">
                    <NavLink to="/">Home</NavLink>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search Q" className="mr-sm-2" />
                    <Button variant="outline-primary">Search</Button>
                    <Link exact to="/question"><Button variant="outline-primary">Ask Q</Button></Link>
                </Form>
            </Navbar>
        )
    }
}

export default Qnav;
