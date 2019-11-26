import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import styled from "styled-components";
// import { Link } from 'react-router-dom';
// import { connect } from "react-redux";
// import * as actions from '../actions';
// import _ from "lodash";
// import InfiniteScroll from 'react-infinite-scroller';
import 'bootstrap/dist/css/bootstrap.min.css';

class AnswerList extends Component {
  constructor() {
    super()

    this.state = {
      answers: [
        {
          id: 1,
          name: "fred",
          qualification: " ",
          text: "will we be ok?"
        },
        {
          id: 2,
          name: "fred",
          qualification: " ",
          text: "will we be ok?"
        },
        {
          id: 3,
          name: "fred",
          qualification: " ",
          text: "will we be ok?"
        }
      ]
    }
  }
  // handleClick = () => {
  //   let path = '/question/:questionid';
  //   this.props.history.push(path);
  // }

  //use Switch to ensure only one route renders at a time
  renderAnswers() {
    let answers = this.state.answers

    return (
      answers.map(a => (
        <p key={a.id}>
          <a href='/' onClick={e => { e.preventDefault(this.fetchAnswers(a.id)); }}>{a.name}</a>
        </p>
      ))
    )
  }

  render() {
    return (
      <div>
        {this.renderAnswers()}
      </div>
    )
  }
}

export default AnswerList;

