import React, { Component } from "react";
import "../App.css";
import * as actions from "../actions/actions";
// import _ from "lodash";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

class AnswerList extends Component {
  // Fetch questions once page assets are ready
  componentDidMount() {
    // loadItems from Infinite scroll seems to run on page load, fetching Questions on mount
    // was creating duplicates
    // this.props.fetchQuestions()
    this.props.fetchLoginStatus();
    const questionid = this.props.questionid;
    this.props.fetchAnswers(questionid);
  }

  renderAnswers() {
    // If questions in state; loop and return each one
    if (this.props.answers.answersList) {
      debugger;
      return (
        <div>
          <div className="card-columns">
            <div className="col-md-12">
              {this.props.answers.answersList.map(a => (
                <div className="card" key={a._id}>
                  <div className="card-body">
                    <h6 className="card-title">
                      <React.Fragment>
                        <span>
                          <img src={a.user.userAvatar} />
                          <h6>
                            {a.user.userName}, {a.user.userCred.credential}
                          </h6>
                        </span>
                        <h6>
                          Answered {moment(a.answerDate).format("MMM DD")}
                        </h6>
                        <span>{a.answer}</span>
                      </React.Fragment>
                    </h6>
                    <small className="text">
                      <i className="material-icons">arrow_upward</i>
                      <i className="material-icons">chat_bubble_outline</i>
                      <i className="material-icons">loop</i>
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderAnswers()}</div>;
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, actions)(AnswerList);
