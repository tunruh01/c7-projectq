import React, { Component } from "react";
import "../App.css";
import CategoryList from './CategoryList'
import * as actions from '../actions/actions';
// import _ from "lodash";
import { connect } from "react-redux";
import InfiniteScroll from 'react-infinite-scroller';
import 'bootstrap/dist/css/bootstrap.min.css';

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

    this.props.fetchLoginStatus()
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
      <div class="card text-center">
           {q.topics.map(topic => (
             <span>{topic.name} </span>
           ))}
      </div>
    )
    
  }

  renderQuestions() {
    // If questions in state; loop and return each one
    if (this.props.questions.questionsList) {
      console.log(this.props.questions.questionsList);
      return (
        <div>
          <div class="card-columns">
            <div class="col-md-12">
              {this.props.questions.questionsList.map(q => (
                <div class="card">
                    {this.renderQuestionCategories(q)}
                  <div class="card-body">
                    <h6 class="card-title">
                      <React.Fragment key={q._id}>
                        <a href={`/question/${q._id}`} onClick={e => { e.preventDefault(this.fetchQuestions(q._id)); }}>{q.question}</a>
                        <p class="card-text">{q.topAnswer.answer}</p>
                      </React.Fragment>
                    </h6>
                    <small class="text">
                      <i class="material-icons">
                        arrow_upward</i>
                      <i class="material-icons">
                        chat_bubble_outline</i>
                      <i class="material-icons">
                        loop</i>
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    const { authenticated } = this.props.auth
    console.log('questionList render props: ', this.props)
    return (
        
        <React.Fragment>
          {authenticated ? (
          <>
            <InfiniteScroll loadMore={this.loadItems} pageStart={0} hasMore={this.state.hasMoreItems}>
            <CategoryList />
            <div>
              {this.renderQuestions()}
            </div>
            </InfiniteScroll>
          </>
          ) : (
              <div>Unauthorized - maybe have a 'please login' component/message here</div>
            )}
            
        </React.Fragment>
      
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, actions)(QuestionList)