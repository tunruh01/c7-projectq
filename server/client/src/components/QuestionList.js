import React, { Component } from "react";
import "../App.css";
import CategoryList from './CategoryList'
import { ListGroup, Button, CardGroup, Row, Col } from 'react-bootstrap'
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
      console.log(this.props.questions.questionsList);
      return (
        <div>
          <div class="card-columns">
            {this.props.questions.questionsList.map(q => (
              <div class="card">
                <div class="card text-center">
                  <div class="card-header">
                    Categories
                </div>
                  <div class="card-body">
                    <h6 class="card-title">
                      <React.Fragment key={q._id}>
                        <a href='/' onClick={e => { e.preventDefault(this.fetchQuestions(q._id)); }}>{q.question}</a>
                        <p class="card-text">{q.topAnswer.answer}</p>
                      </React.Fragment>
                    </h6>
                    <div class="card-footer">
                      <small class="text-muted">
                        icons here..
                          </small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  }

  render() {
    console.log('questionList render props: ', this.props)
    return (
      <React.Fragment>
        <CategoryList />
        <div>
          {this.renderQuestions()}
        </div>
      </React.Fragment>

    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, actions)(QuestionList)