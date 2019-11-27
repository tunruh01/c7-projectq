import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import QuestionList from './components/QuestionList'
import QuestionDetail from './components/QuestionDetail'
import SubmitQuestion from './components/SubmitQuestion'
// import Login from './components/Login'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={QuestionList} />
          <Route exact path="/question" component={SubmitQuestion} />
          <Route exact path="/question/:questionid" component={QuestionDetail} />
          {/* <Route exact path="/login" component={Login} /> */}
        </ Switch>
      </div>
    )
  }
}

export default App