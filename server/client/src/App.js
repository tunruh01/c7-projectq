import React, { Component } from 'react'
import Qnav from "./components/Qnav";
import QuestionList from './components/QuestionList'
// import CategoryList from './components/CategoryList'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Qnav fixed="top" />
        <QuestionList />
        {/* <CategoryList /> */}

      </div>
    )
  }
}

export default App