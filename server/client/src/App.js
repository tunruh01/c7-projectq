import React, { Component } from 'react'
import QuestionList from './components/QuestionList'
import CategoryList from './components/CategoryList'
import Qnav from "./components/Qnav";
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Qnav />
        {/* <QuestionList />
        <CategoryList /> */}
      </div>
    )
  }
}

export default App