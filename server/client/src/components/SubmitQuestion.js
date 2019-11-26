
import React, { Component } from 'react';

class SubmitQuestion extends Component {
    constructor() {
        super()

        this.state = {
            questionText: '',
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const question = {
            questionText: this.state.questionText
        }
        this.props.addQuestion(question);
    };



    render() {
        return (
            <div>
                <h1>Add Question</h1>
                <label>Username asked</label>
                <input
                    className="questionText"
                    placeholder="Start your question with What, How, Why, etc "
                    value={this.state.questionText}
                    onChange={event => this.setState({ questionText: event.target.value })}
                />
                <hr></hr>
                <br></br>
                <hr></hr>
                <button type="button" className="btn btn-primary" id="bPost">Add Question</button>
                <button type="button" className="btn btn-primary" id="bPost">Cancel</button>
                <br></br>
            </div>

        );
    };
}

export default SubmitQuestion;