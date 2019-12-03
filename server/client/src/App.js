import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import * as actions from "./actions/actions";
import { connect } from "react-redux";
import QuestionList from "./components/QuestionList";
import QuestionDetail from "./components/QuestionDetail";
import SubmitQuestion from "./components/SubmitQuestion";
// import Login from './components/Login'

class App extends Component {
  // Fetch questions once page assets are ready
  componentDidMount() {
    // loadItems from Infinite scroll seems to run on page load, fetching Questions on mount
    // was creating duplicates
    // this.props.fetchQuestions()

    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    console.log(this.props.state);
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    this.props.fetchLoginStatus();
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={QuestionList} />
          <Route exact path="/question" component={SubmitQuestion} />
          <Route
            exact
            path="/question/:questionid"
            component={QuestionDetail}
          />
          {/* <Route exact path="/login" component={Login} /> */}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};

export default connect(mapStateToProps, actions)(App);
