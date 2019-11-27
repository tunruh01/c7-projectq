import React, { Component } from "react";
import "../App.css";
import CategoryList from './CategoryList'
//import { ListGroup } from 'react-bootstrap'
import * as actions from '../actions/actions';
//import { bindActionCreators } from 'redux'
// import _ from "lodash";
import { connect } from "react-redux";
// import InfiniteScroll from 'react-infinite-scroller';
import 'bootstrap/dist/css/bootstrap.min.css';

class QuestionList extends Component {
  

  // Fetch questions once page assets are ready
  componentDidMount() {
    this.props.fetchQuestions()
  }



  renderQuestions() {
    // If questions in state; loop and return each one
    if (this.props.questions.questionsList) {
      return (
        this.props.questions.questionsList.map(q => (
          <p key={parseInt(q.id)}>
            <a href='/' onClick={e => { e.preventDefault(this.fetchQuestions(q.id)); }}>{q.question}</a>
            <p>{q.topAnswer.answer}</p>
          </p>
        ))
      )
    }

  }


  render() {
    console.log('questionList render props: ', this.props)
    return (
      <div>
        <CategoryList/>

        <div class="container">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <li class="list-group-item">Questions</li>
              <li class="list-group-item">{this.renderQuestions()}</li>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}


export default connect(mapStateToProps, actions)(QuestionList)