import React, { Component } from "react";
import "../App.css";
import * as actions from '../actions/actions';
// import _ from "lodash";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

class AnswerList extends Component {


  // Fetch questions once page assets are ready
  componentDidMount() {
    // loadItems from Infinite scroll seems to run on page load, fetching Questions on mount
    // was creating duplicates
    // this.props.fetchQuestions()
    this.props.fetchLoginStatus()
    const questionid = this.props.questionid
    this.props.fetchAnswers(questionid)
  }

  renderAnswers() {
    // If questions in state; loop and return each one
    if (this.props.answers.answersList) {
      console.log(this.props.answers.answersList);
      return (
        <div>
          <div class="card-columns">
            <div class="col-md-12">
              {this.props.answers.answersList.map(a => (
                <div class="card">
                  <div class="card-body">
                    <h6 class="card-title">
                      <React.Fragment key={a._id}>
                        <span>{a.answer}</span>
                        <p class="card-text">asdf123</p>
                      </React.Fragment>
                    </h6>
                    <small class="text">
                      <i class="material-icons">
                        arrow_upward</i>
                      <i class="material-icons">
                        chat_bubble_outline</i>
                      <i class="material-icons">
                        loop</i>
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  }


  render() {
    console.log('answerList render props ', this.props)
    return (
      <div>{this.renderAnswers()}</div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, actions)(AnswerList)