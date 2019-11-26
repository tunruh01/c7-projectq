import React, { Component } from "react";
import { Switch, Route, Router } from 'react-router-dom';
// import styled from "styled-components";
// import { Link } from 'react-router-dom';
// import { connect } from "react-redux";
// import * as actions from '../actions';
// import _ from "lodash";
// import InfiniteScroll from 'react-infinite-scroller';
import 'bootstrap/dist/css/bootstrap.min.css';

class QuestionList extends Component {
  state = {
    questions: [
      {
        category: "development",
        name: "fred",
        text: "will we be ok?"
      },
      {
        category: "development",
        name: "fred",
        text: "will we be ok?"
      },
      {
        category: "development",
        name: "fred",
        text: "will we be ok?"
      }
    ]
  }

  // handleClick = () => {
  //   let path = '/question/:questionid';
  //   this.props.history.push(path);
  // }

  //use Switch to ensure only one route renders at a time
  render() {
    return (
      <Router>
        <div className="QuestionList">
          <div className="container">
            <h1>Questions</h1>
            {/* each contact on the main route should be clickable; when clicked, leads to a new route */}
            <Switch>
              <Route exact path="/" render={() => <QuestionList questions={this.state.questions} />} />
              {/* <Route path="/contacts/new" render={props => <AddContact addContact={this.addContact} />} />
              <Route path="/contacts/:contactId" render={routerProps => <ContactDetail routerProps={routerProps} contacts={this.state.contacts} />} /> */}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default QuestionList;

