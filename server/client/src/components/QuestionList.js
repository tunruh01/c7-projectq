import React, { Component } from 'react'
import _ from 'lodash'
import Navbar from '/Navbar'

class QuestionList extends Component {
  componentDidMount() {
    this.props.fetchQuestions()
  }
}

renderQuestions() {
  return _.map(this.props.questions, questions => {
    return
  })

}

export default QuestionList