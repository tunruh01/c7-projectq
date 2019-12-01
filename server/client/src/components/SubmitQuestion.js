
import React, { Component } from 'react';
import * as actions from '../actions/actions';
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { create } from 'istanbul-reports';

class SubmitQuestion extends Component {
    constructor() {
        super()

        this.state = {
            questionText: 'What does hello world mean?',

        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const question = {
            questionText: this.state.questionText
        }
        this.props.addQuestion(question);
    }

    submitQuestion() {
      const questionValues = {
        topics: ['5dde5262a973fc1fc9fa9144'],
        question: 'Am I submitting the question or is the question submitting me?'
      }
      console.log('im props', this.props)
      this.props.createQuestion(questionValues, () => {
        console.log('create question callback')
      })

    }

    render() {
      console.log(this.props)
        return (
            <form>
                <h1>Ask Question</h1>

                <label>Username asked</label>
                <div className="form-group">
                    <input
                        className="questionText"
                        placeholder="Start your question with What, How, Why, etc "
                        value={this.state.questionText}
                        onChange={event => this.setState({ questionText: event.target.value })}
                    />

                    <hr></hr>

                    <br></br>

                </div>
                {/* on click route to the new question's detail page */}
                <Button variant="outline-secondary mr-2" size=""onClick={this.submitQuestion.bind(this)}>Ask Question</Button>

                {/* cancel button needs to re route user back to the last route they were on. */}
                <Button variant="outline-danger mr-2" size="">Cancel</Button>

                <br></br>
            </form>
        );
    };
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, actions)(SubmitQuestion)