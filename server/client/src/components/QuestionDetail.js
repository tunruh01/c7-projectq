import React, { Component } from "react";
// import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../actions/actions';
import AnswerList from './AnswerList'
import SubmitAnswer from "./SubmitAnswer";




class QuestionDetail extends Component {
  componentDidMount() {
    this.props.fetchLoginStatus()
    const questionid = this.props.match.params.questionid
    this.props.fetchQuestionDetails(questionid)
  }

  renderCategories() {
    const { questionDetails } = this.props
    return (
      <div>
        {questionDetails.topics.map(topic => (
          <div key={topic._id}>{topic.name}</div>
        ))}
      </div>
    )

  }

  render() {
    const { authenticated } = this.props.auth
    const { questionDetails } = this.props

    return (
      <div>
        {(authenticated) ? (
          <>
            <div>
              Categories: {this.renderCategories()}
              <h3>
                {questionDetails.question}
              </h3>
            </div>

            <AnswerList questionid={this.props.match.params.questionid} />
            <SubmitAnswer questionid={this.props.match.params.questionid} />
          </>
        ) : (
            <div>Unauthorized - maybe have a 'please login' component/message here</div>
          )}

      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, actions)(QuestionDetail)