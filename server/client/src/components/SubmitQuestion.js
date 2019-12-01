
import React, { Component } from 'react';
import { Button } from "react-bootstrap";

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

    render() {
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
                <Button variant="outline-secondary mr-2" size="">Ask Question</Button>

                {/* cancel button needs to re route user back to the last route they were on. */}
                <Button variant="outline-danger mr-2" size="">Cancel</Button>

                <br></br>
            </form>
        );
    };
}

export default SubmitQuestion;