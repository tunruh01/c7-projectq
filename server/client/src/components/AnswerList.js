import React, { Component } from "react";
import "../App.css";
import * as actions from "../actions/actions";
// import _ from "lodash";
import { connect } from "react-redux";
import { Image } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import ShowMoreText from "react-show-more-text";
import InfiniteScroll from "react-infinite-scroller";

// Hacky CSS styling used in upvoted answers
const upvotedStyle = {
  'color': 'teal',
  'font-size': '28px',
  'margin-bottom': '10px',
  'padding-bottom': '10px'
}

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


    if (page <= this.props.total_pages || this.props.total_pages === 0) {
      this.props.fetchAnswers(questionid, page);
    } else {
      this.setState({ hasMoreItems: false });
    }
  }

  // upvote icon click handler - Back end will not allow multiple upvotes on the same post.
  upvoteAnswerHandler(answerid) {
    console.log('upvote clicked for id: ', answerid);
    this.props.upvoteAnswer(answerid);
    window.location.reload();
  }

  // Change styling of upvote icon based on whether or not the user has already upvoted
  showCorrectUpvoteIcon(answerid) {
    const upvotedAnswers = this.props.auth.user.upvotedAnswers
    if (upvotedAnswers.includes(answerid)) {
      return (
        <>
          <i className="material-icons float-left mr-2" style={upvotedStyle}>arrow_upward</i>
        </>
      )
    } else {
      return (
        <i className="material-icons float-left mr-3" style={{ 'font-size': '30px' }}>arrow_upward</i>
      )
    }
  }

  renderUpVoteCount(a) {
    if (a.answerScore === undefined || !a.answerScore || a.answerScore === null || !a.answerScore) {
      return <span>{''}</span>
    } else {
      let upvotes = a.answerScore;
      let upvote;
      if (upvotes > 1) {
        upvote = "upvotes"
      } else {
        upvote = "upvote"
      }
      return <span>{upvotes} {upvote}</span >
    }
  }

  renderAnswers() {
    // If questions in state; loop and return each one
    if (this.props.answers.answersList) {
      return (
        <div>
          <div className="card-columns">
            <div className="col-md-12">
              {this.props.answers.answersList.map(a => {
                const executeOnClick = isExpanded => {
                  console.log(isExpanded);
                };
                return (
                  <div className="card" key={a._id}>
                    <div className="card-body">
                      <h6 className="card-title">
                        <React.Fragment>
                          <span>

                            <div>
                              <img className="thumbnailAnswer" roundedCircle src={a.user.userAvatar} roundedCircle /><br></br>
                              <div className="user-answer-format">{a.user.userName},{" "}

                                {a.user.userCred
                                  ? a.user.userCred.credential
                                  : "my credential"} </div><br></br>
                              <div className="date-answer-format">Answered {moment(a.answerDate).format("MMM DD")}</div>
                            </div>

                            <br></br>

                          </span>


                          <ShowMoreText
                            lines={1}
                            more="More"
                            less="Less"
                            anchorClass=""
                            onClick={this.executeOnClick}
                            expanded={false}
                          >
                            <span>{a.answer}</span>
                          </ShowMoreText>
                        </React.Fragment>
                      </h6>
                      <small className="text">

                        <a href="#" onClick={e => { e.preventDefault(this.upvoteAnswerHandler(a._id)) }}>
                          {this.showCorrectUpvoteIcon(a._id)}
                        </a>
                        {//Temporary code to demo upvote count
                        }
                        <a className="float-left mr-4" style={{ 'font-size': '23px', 'margin-top': '5px' }}>{this.renderUpVoteCount(a)} </a>
                        <a href=""> <i className="material-icons float-left" style={{ 'margin-top': '3px' }}>chat_bubble_outline</i> </a>
                      </small>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div >

      );
    }
  }

  render() {
    console.log('answerlist render props', this.props)
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
