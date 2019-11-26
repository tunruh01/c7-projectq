import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CategoryList from './CategoryList'
// import * as actions from '../actions';
// import _ from "lodash";
// import InfiniteScroll from 'react-infinite-scroller';
import 'bootstrap/dist/css/bootstrap.min.css';

class QuestionList extends Component {
  constructor() {
    super()

    this.state = {
      questions: [
        {
          id: 1,
          category: "development",
          name: "fred",
          text: "will we be ok?"
        },
        {
          id: 2,
          category: "development",
          name: "fred",
          text: "will we be ok?"
        },
        {
          id: 3,
          category: "development",
          name: "fred",
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
  renderQuestions() {
    let questions = this.state.questions

    return (
      questions.map(q => (
        <p key={q.id}>
          <a href='/' onClick={e => { e.preventDefault(this.fetchQuestions(q.id)); }}>{q.name}</a>
        </p>
      ))
    )
  }

  render() {
    return (
      <div>
      <CategoryList/>
        <div className="QuestionList">
          <div className="container">
            <h1>Questions</h1>
            
          </div>
        </div>
      </div>

    );
  }
}

export default QuestionList;

