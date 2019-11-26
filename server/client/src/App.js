import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import QuestionList from './components/QuestionList'
import QuestionDetail from './components/QuestionDetail'
// import CategoryList from './components/CategoryList'
import SubmitQuestion from './components/SubmitQuestion'
import Login from './components/Login'


class App extends Component {
  render() {
    return (
      <div className="App">
        
        <Switch>
          <Route exact path="/" component={QuestionList} />
          <Route exact path="/question" component={SubmitQuestion} />
          <Route exact path="/question:questionid" component={QuestionDetail} />
          <Route exact path="/login" component={Login} />
          
        </ Switch>
        {/* <CategoryList /> */}
        
        {/* <QuestionList />
        <CategoryList /> */}

      </div>
    )
  }
}

export default App