import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import CategoryList from "./CategoryList";
import * as actions from "../actions/actions";
import _ from "lodash";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import ShowMoreText from "react-show-more-text";

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
    if (page < this.props.total_pages || this.props.total_pages === 0) {
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
          <span>
            {topic.name} - {q.questionDate}
          </span>
        ))}
      </div>
    );
  }

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
                  <div className="card">
                    {this.renderQuestionCategories(q)}
                    <div className="card-body">
                      <h6 className="card-title">
                        <div key={q._id}>
                          <a href={`/question/${q._id}`}>{q.question}</a>
                          {!q.topAnswer ? (
                            <p className="card-text">
                              This question hasn't been answered yet
                            </p>
                          ) : (
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
                          )}
                        </div>
                      </h6>
                      <small class="text">
                        <i class="material-icons float-left">arrow_upward</i>
                        <i class="material-icons float-right">
                          chat_bubble_outline
                        </i>
                        <i class="material-icons float-left">loop</i>
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
            Unauthorized - maybe have a 'please login' component/message here
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
