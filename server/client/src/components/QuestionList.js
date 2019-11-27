import React, { Component } from "react";
import CategoryList from './CategoryList'
import * as actions from '../actions/actions';
import { bindActionCreators } from 'redux'
// import _ from "lodash";
import { connect } from "react-redux";
// import InfiniteScroll from 'react-infinite-scroller';
import 'bootstrap/dist/css/bootstrap.min.css';

class QuestionList extends Component {
  // constructor() {
  //   super()

    // this.state = {
    //   questions: [
    //     {
    //       id: 1,
    //       category: "development",
    //       name: "fred",
    //       text: "will we be ok?"
    //     },
    //     {
    //       id: 2,
    //       category: "development",
    //       name: "fred",
    //       text: "will we be ok?"
    //     },
    //     {
    //       id: 3,
    //       category: "development",
    //       name: "fred",
    //       text: "will we be ok?"
    //     }
    //   ]
    // }
  // }

  // Fetch questions once page assets are ready
  componentDidMount () {
    this.props.fetchQuestions()
  }

  // handleClick = () => {
  //   let path = '/question/:questionid';
  //   this.props.history.push(path);
  // }

  // renderQuestions() {
  //   let questions = this.state.questions

  //   return (
  //     questions.map(q => (
  //       <p key={q.id}>
  //         <a href='/' onClick={e => { e.preventDefault(this.fetchQuestions(q.id)); }}>{q.name}</a>
  //       </p>
  //     ))
  //   )
  // }

  renderQuestions() {
    // If questions in state; loop and return each one
    if(this.props.questions.questionsList) {
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
        <div className="QuestionList">
          <div className="container">
            <h1>Questions</h1>
            {this.renderQuestions()}
          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList)