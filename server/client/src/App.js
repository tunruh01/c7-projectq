import React, { Component } from 'react'
//import Navbar from './components/Navbar'
import QuestionList from './components/QuestionList'
import CategoryList from './components/CategoryList'
import Qnav from "./components/Qnav";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Navbar /> */}
        {/* <QuestionList /> */}
        <CategoryList />
        <Qnav fixed="top" />
        <QuestionList />
        {/* <CategoryList /> */}

      </div>
    )
  }
}

export default App