import React, { Component } from "react";
// import { Field, reduxForm } from "redux-form";
import "../App.css";
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
      <div> <b>Categories: </b>{questionDetails.topics.map(topic => (
          <div className="cat-item" key={topic._id}>{topic.name}</div>
        ))}
      </div>
    )

  }

  render() {
    const { authenticated } = this.props.auth
    const { questionDetails } = this.props
    // temporary form until we implement redux so we can use redux-form 
    return (
      <div className="container">
        {(authenticated) ? (
          <>
            <div className="question-detail">
             
              <br></br>
              {questionDetails.question}
            </div>
              <hr></hr>
              <div className="category-detail" >
             {this.renderCategories()}
            </div>
            <AnswerList questionid={this.props.match.params.questionid} />
            <div className="row example-wrapper">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 offset-sm-3 example-col">
                <div className="card">
                  <div className="card-block">
                    <SubmitAnswer questionid={this.props.match.params.questionid} />
                  </div>
                </div>
              </div>
            </div>
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