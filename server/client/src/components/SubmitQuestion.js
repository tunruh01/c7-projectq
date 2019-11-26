
import React, { Component } from 'react';

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
        <h1>Add Question</h1>

        <label>Username asked</label>
       <div className="form-group"> 
        <input 
        className="questionText" 
        placeholder="Start your question with What, How, Why, etc " 
        value={this.state.questionText}
        onChange={event => this.setState({questionText: event.target.value})}
        />
      
        <hr></hr>

        <br></br>

        </div>
        {/* on click route to the new question's detail page */}
        <button type="button" className="btn btn-primary" id="bPost">Add Question</button>

        {/* cancel button needs to re route user back to the last route they were on. */}
        <button type="button" className="btn btn-danger" id="bPost">Cancel</button>
        
        <br></br>
        </form>

        );
    };
}

export default SubmitQuestion;