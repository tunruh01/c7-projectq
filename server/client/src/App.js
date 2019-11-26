import React, { Component } from 'react'
import Qnav from './components/Qnav'
import QuestionList from './components/QuestionList'
// import CategoryList from './components/CategoryList'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Qnav />
        <QuestionList />
        {/* <CategoryList /> */}
      </div>
    )
  }
}

export default App