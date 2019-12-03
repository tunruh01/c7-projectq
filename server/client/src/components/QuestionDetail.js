import React, { Component } from "react";
// import { Field, reduxForm } from "redux-form";
import "../App.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../actions/actions';
import AnswerList from './AnswerList'
import { Button } from "react-bootstrap";

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
          <div className="category-detail" key={topic._id}>{topic.name}</div>
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
              {this.renderCategories()}
              <br></br>
              {questionDetails.question}
            </div>
            <AnswerList questionid={this.props.match.params.questionid} />
            <div className="row example-wrapper">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 offset-sm-3 example-col">
                <div className="card">
                  <div className="card-block">
                    <form className="k-form">
                      <fieldset>
                        <legend>Add Your Answer</legend>

                        <label className="k-form-field">
                          <span> Name </span>
                          <input className="k-textbox" placeholder="Your Name" />
                        </label>

                      </fieldset>

                      <fieldset>
                        <legend>Credentials</legend>
                        <label className="k-form-field">
                          <span> Why can you answer this question? </span>
                          <input className="k-textbox" placeholder="Your Credentials" />
                        </label>
                      </fieldset>

                      <div className="text-right">
                        <Link to="/">
                          <Button variant="outline-danger mr-2" size="sm">Back</Button>
                        </Link>
                        <Button variant="outline-dark mr-2" size="sm">Submit</Button>
                      </div>
                    </form>
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