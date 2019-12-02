import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import CategoryList from "./CategoryList";
import * as actions from "../actions/actions";
// import _ from "lodash";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import ShowMoreText from "react-show-more-text";
import { Form, Container, FormControl, Button, Nav, Image } from "react-bootstrap";

class QuestionList extends Component {
  constructor() {
    super();

    this.loadItems = this.loadItems.bind(this);

    this.state = {
      hasMoreItems: true
    };
  }

  // Fetch questions once page assets are ready
  componentDidMount() {
    // loadItems from Infinite scroll seems to run on page load, fetching Questions on mount
    // was creating duplicates
    // this.props.fetchQuestions()

    this.props.fetchLoginStatus();
  }

  //  Stops infinite scroll querying when there are no more questions to load
  loadItems(page) {
    if (page < this.props.total_pages || this.props.total_pages === 0) {
      this.props.fetchQuestions(page);
    } else {
      this.setState({ hasMoreItems: false });
    }
  }

  renderQuestionCategories(q) {
    return (
      <div className="card text-center">
        {q.topics.map(topic => (
          <span>{topic.name} </span>
        ))}
      </div>
    );
  }
  // { q.topAnswer.user.cred }
  renderQuestions() {

    // If questions in state; loop and return each one
    if (this.props.questions.questionsList) {
      console.log("questionsList: ", this.props.questions.questionsList);
      return (
        <div>
          <div className="card-columns">
            <div className="col-md-12">
              {this.props.questions.questionsList.map(q => {
                const executeOnClick = isExpanded => {
                  console.log(isExpanded);
                };

                return (
                  <div className="card">
                    {this.renderQuestionCategories(q)}
                    <div className="card-body">
                      <h6 className="card-title">
                        <React.Fragment key={q._id}>
                          <a href={`/question/${q._id}`}>{q.question}</a>
                          {!q.topAnswer ? (
                            <p className="card-text">
                              This question hasn't been answered yet
                            </p>
                          ) : (
                              <>
                                <hr></hr>
                                <div className="userCred" align="left">
                                  <Image className="avatar" src={q.topAnswer.user.userAvatar} height="42" width="42" roundedCircle>
                                  </Image>{q.topAnswer.user.userName} <b>{q.topAnswer.user.cred}</b>
                                </div>
                                <ShowMoreText
                                  lines={1}
                                  more="more"
                                  less="less"
                                  anchorClass=""
                                  onClick={this.executeOnClick}
                                  expanded={false}
                                >

                                  <p className="card-text">{q.topAnswer.answer}</p>
                                </ShowMoreText>
                              </>
                            )}
                        </React.Fragment>
                      </h6>
                      <small class="text">
                        <a href=""> <i class="material-icons float-left mr-2">arrow_upward</i> </a>
                        <a href=""> <i class="material-icons float-left">
                          add_comment</i> </a>
                      </small>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    const { authenticated } = this.props.auth;
    return (
      <React.Fragment>
        {authenticated ? (
          <>
            <InfiniteScroll loadMore={this.loadItems} pageStart={0} hasMore={this.state.hasMoreItems}>
              <div className="row flex-nowrap">
                <div className="col-md-3 justify-content-md-center">
                  <CategoryList />
                </div>
                <div className="col-md-9">
                  {this.renderQuestions()}
                </div>
              </div>
            </InfiniteScroll>
          </>
        ) : (
            <div>
              <div className="error">
                Unauthorized - maybe have a 'please login' component/message here
              </div>

            </div>
          )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, actions)(QuestionList);
