
import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CategoryList from './CategoryList'
// import * as actions from '../actions';
import _ from "lodash";
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

  handleClick = () => {
    let path = '/question/:questionid';
    this.props.history.push(path);
  }

  //use Switch to ensure only one route renders at a time
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

