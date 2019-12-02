import React, { Component } from "react";
import "../App.css";
import * as actions from "../actions/actions";
// import _ from "lodash";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import InfiniteScroll from 'react-infinite-scroller';

class AnswerList extends Component {
  constructor() {
    super();

    this.loadItems = this.loadItems.bind(this);

    this.state = {
      hasMoreItems: true
    };
  }

  componentDidMount() {
    // loadItems from Infinite scroll seems to run on page load, fetching Answers on mount
    // was creating duplicates
    // const questionid = this.props.questionid;
    // this.props.fetchAnswers(questionid);

    this.props.fetchLoginStatus();
  }

    //  Stops infinite scroll querying when there are no more questions to load
    loadItems(page) {
      const questionid = this.props.questionid;
      console.log('infinite scroll page: ', page)
      
      if (page < this.props.total_pages || this.props.total_pages === 0) {
        this.props.fetchAnswers(questionid, page);
      } else {
        this.setState({ hasMoreItems: false });
      }
    }

  renderAnswers() {
    // If questions in state; loop and return each one
    if (this.props.answers.answersList) {
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
                            {a.user.userName}, {a.user.userCred ? a.user.userCred.credential : 'my credential'}
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
    return (
    <>
      <InfiniteScroll loadMore={this.loadItems} pageStart={0} hasMore={this.state.hasMoreItems}>
        <div>{this.renderAnswers()}</div>
      </InfiniteScroll>
    </>
    )
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, actions)(AnswerList);
