import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import CategoryList from "./CategoryList";
import * as actions from "../actions/actions";
import _ from "lodash";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import ShowMoreText from "react-show-more-text";
import { Link } from "react-router-dom";
import {
  Form,
  Container,
  FormControl,
  Button,
  Nav,
  Image
} from "react-bootstrap";

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
    console.log(this.props);
    console.log(this.props.category.selectedTopic);
    let selectedTopic = this.props.category.selectedTopic;
    console.log('curent page: ', page)
    if (page <= this.props.total_pages || this.props.total_pages === 0) {
      console.log(selectedTopic);
      this.props.fetchQuestions(page, selectedTopic);
    } else {
      this.setState({ hasMoreItems: false });
    }
  }

  renderQuestionCategories(q) {
    return (
      <div className="card text-center">
        {q.topics.map(topic => (
          <span>{topic.name}</span>
        ))}
      </div>
    );
  }
  // { q.topAnswer.user.cred }
  renderQuestions() {
    // If questions in state; loop and return each one
    if (this.props.questions) {
      console.log("questionsList: ", this.props.questions);
      return (
        <div>
          <div className="card-columns">
            <div className="col-md-12">
              {_.map(this.props.order, q_key => {
                let q = this.props.questions[q_key];
                const executeOnClick = isExpanded => {
                  console.log(isExpanded);
                };

                return (
                  <Link to={`/question/${q._id}`} style={{ textDecoration: 'none' }} className="card">
                    {this.renderQuestionCategories(q)}
                    <div className="card-body">
                      <h6 className="card-title">
                        <React.Fragment key={q._id}>
                          <div className="main-question-body">
                            {q.question}
                          </div>
                          {!q.topAnswer ? (
                            <p className="card-text">
                              This question hasn't been answered yet
                            </p>
                          ) : (
                            <>
                              <hr></hr>
                              <div className="userCred" align="left">
                                <Image
                                  className="avatar"
                                  src={q.topAnswer.user.userAvatar}
                                  height="42"
                                  width="42"
                                  roundedCircle
                                ></Image>
                                {q.topAnswer.user.userName}{" "}
                                <b>{q.topAnswer.user.cred}</b>
                              </div>
                              <ShowMoreText
                                lines={1}
                                more="more"
                                less="less"
                                anchorClass=""
                                onClick={this.executeOnClick}
                                expanded={false}
                              >
                                <p className="card-text">
                                  {q.topAnswer.answer}
                                </p>
                              </ShowMoreText>
                            </>
                          )}
                        </React.Fragment>
                      </h6>
                      <small className="text">
                        <a href="">
                          {" "}
                          <i className="material-icons float-left mr-2">
                            arrow_upward
                          </i>{" "}
                        </a>
                        <a href="">
                          {" "}
                          <i className="material-icons float-left">
                            add_comment
                          </i>{" "}
                        </a>
                      </small>
                    </div>
                  </Link>
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
            <div className="row flex-nowrap">
              <div className="col-md-3 justify-content-md-center">
                <CategoryList />
              </div>
              <div className="col-md-9">
                <InfiniteScroll
                  loadMore={this.loadItems}
                  pageStart={0}
                  hasMore={this.state.hasMoreItems}
                >
                  {this.renderQuestions()}
                </InfiniteScroll>
              </div>
            </div>
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
  return {
    questions: state.questions,
    category: state.category,
    total_pages: state.total_pages,
    auth: state.auth,
    order: state.questionOrder
  };
};

export default connect(mapStateToProps, actions)(QuestionList);
