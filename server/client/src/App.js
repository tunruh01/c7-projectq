import React, { Component } from 'react'
//import Navbar from './components/Navbar'
import QuestionList from './components/QuestionList'
import CategoryList from './components/CategoryList'


class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Navbar /> */}
        <QuestionList />
        <CategoryList />
      </div>
    )
  }
}

export default App