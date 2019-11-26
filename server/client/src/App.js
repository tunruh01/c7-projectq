import React, { Component } from 'react'
import QuestionList from './components/QuestionList'
import CategoryList from './components/CategoryList'
import QuestionDetail from './components/QuestionDetail'
import Qnav from "./components/Qnav";
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Qnav fixed="top" />
        {/* <QuestionList />
        <CategoryList /> */}
        <QuestionDetail />
      </div>
    )
  }
}

export default App