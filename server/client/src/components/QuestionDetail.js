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
          <div key={topic._id}>{topic.name}</div>
        ))}
      </div>
    )

  }

  render() {
    const { authenticated } = this.props.auth
    const { questionDetails } = this.props
    // temporary form until we implement redux so we can use redux-form 
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
            <div className='padding'>
              <h4 className="text-center" style={{ color: "grey" }}>Answer question</h4>
              <div className="col-md-6 offset-md-3">
                <div className="row">
                  <form
                    name="addContact"
                    className="offset-md-4"
                  >
                    <input
                      className="form-control"
                      placeholder="Name"
                    />
                    <input
                      className="form-control"
                      placeholder="Credentials"
                    />
                    <input
                      className="form-control"
                      placeholder="answer..."
                    />
                    <Link to="/">
                      <Button variant="outline-dark mr-2" size="sm">Back</Button>
                    </Link>
                    <Button variant="outline-dark mr-2" size="sm">Submit</Button>
                  </form>
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