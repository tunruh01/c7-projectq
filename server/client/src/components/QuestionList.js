import React, { Component } from "react";
import "../App.css";
import CategoryList from './CategoryList'
import { ListGroup, Button, CardGroup, Row, Col } from 'react-bootstrap'
import * as actions from '../actions/actions';
//import { bindActionCreators } from 'redux'
// import _ from "lodash";
import { connect } from "react-redux";
// import InfiniteScroll from 'react-infinite-scroller';
import 'bootstrap/dist/css/bootstrap.min.css';

class QuestionList extends Component {

  // Fetch questions once page assets are ready
  componentDidMount() {
    this.props.fetchQuestions()
    this.props.fetchLoginStatus()
  }


  renderQuestions() {
    // If questions in state; loop and return each one
    if (this.props.questions.questionsList) {
      console.log(this.props.questions.questionsList);
      return (
        <div>
          <div class="card-columns">
            {this.props.questions.questionsList.map(q => (
              <div class="card">
                <div class="card text-center">
                  <div class="card-header">
                    Categories
                </div>
                  <div class="card-body">
                    <h6 class="card-title">
                      <React.Fragment key={q._id}>
                        <a href='/' onClick={e => { e.preventDefault(this.fetchQuestions(q._id)); }}>{q.question}</a>
                        <p class="card-text">{q.topAnswer.answer}</p>
                      </React.Fragment>
                    </h6>
                    <div class="card-footer">
                      <small class="text-muted">
                        icons here..
                          </small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  }

  render() {
    const { authenticated } = this.props.auth;
    const { user } = this.props.auth;
    console.log('questionList render props: ', this.props)
    return (
      <React.Fragment>
        <div>
          {!authenticated ? (
            <>
            <h1>Welcome! Currently not logged in</h1>
            <button onClick={this._handleSignInClick} className='btn-primary'>Login</button>
            </>

          ) : (
            <div>
              <h1>You have logged in succcessfully!</h1>
              <h2>Welcome {user.name}!</h2>
              <button onClick={this._handleLogoutClick} className='btn-primary'>Logout</button>
            </div>
          )}
        </div>
        <CategoryList />
        <div>
          {this.renderQuestions()}
        </div>
      </React.Fragment>

    )
  }
  _handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open Twitter login page
    // Upon successful login, a cookie session will be stored in the client
    window.open("http://localhost:5000/auth/google", "_self");
  };

  _handleLogoutClick = () => {
    // Logout using Twitter passport api
    // Set authenticated state to false in the HomePage
    window.open("http://localhost:5000/auth/logout", "_self");
  };
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, actions)(QuestionList)