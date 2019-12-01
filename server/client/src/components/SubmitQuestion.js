import React, { Component } from 'react';
import { Field, reduxForm } from "redux-form";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createQuestion } from '../actions/actions';

class SubmitQuestion extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
    
        return (
          <div className={className}>
            <label>{field.label}</label>
            <input className="form-control" type="text" {...field.input} />
            <div className="text-help">
              {touched ? error : ""}
            </div>
          </div>
        );
      }
    // this.handleClick = this.handleClick.bind(this);




    //change the address after deployment
    // fetch('localhost:3000/question/', {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
          
    //     })
    //   })
   
    onSubmit(values) {
        this.props.createQuestion(values, () => {
          console.log('submitting question')
          // this.props.history.push("/question/{questionId}");
        });
      }

render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="User asked"
          name="question"
          component={this.renderField}
          
        //   placeholder="Start your question with What, How, Why, etc"
        //   onChange={event => this.handleClick({questionText: event.target.value})}
        />
        <Field
          label='TopicIDs'
          name='topics'
          component={this.renderField}
        />
        
        <button type="submit" className="btn btn-primary">Add Question</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>

        );
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createQuestion }, dispatch);
  }

const postNewQuestion = reduxForm({
    form: 'questionNew'
    
})(SubmitQuestion);

export default connect(null, mapDispatchToProps)(postNewQuestion);


//<form onSubmit={handleSubmit(this.onSubmit.bind(this))}></form>


// import React, { Component } from 'react';
// import * as actions from '../actions/actions';
// import { Button } from "react-bootstrap";
// import { connect } from "react-redux";
// import { create } from 'istanbul-reports';

// class SubmitQuestion extends Component {
//     constructor() {
//         super()

//         this.state = {
//             questionText: 'What does hello world mean?',

//         }
//         this.handleClick = this.handleClick.bind(this);
//     }

//     handleClick() {
//         const question = {
//             questionText: this.state.questionText
//         }
//         this.props.addQuestion(question);
//     }

//     submitQuestion() {
//       const questionValues = {
//         topics: ['5dde5262a973fc1fc9fa9144'],
//         question: 'Am I submitting the question or is the question submitting me?'
//       }
//       console.log('im props', this.props)
//       this.props.createQuestion(questionValues, () => {
//         console.log('create question callback')
//       })

//     }

//     render() {
//       console.log(this.props)
//         return (
//             <form>
//                 <h1>Ask Question</h1>

//                 <label>Username asked</label>
//                 <div className="form-group">
//                     <input
//                         className="questionText"
//                         placeholder="Start your question with What, How, Why, etc "
//                         value={this.state.questionText}
//                         onChange={event => this.setState({ questionText: event.target.value })}
//                     />

//                     <hr></hr>

//                     <br></br>

//                 </div>
//                 {/* on click route to the new question's detail page */}
//                 <Button variant="outline-secondary mr-2" size=""onClick={this.submitQuestion.bind(this)}>Ask Question</Button>

//                 {/* cancel button needs to re route user back to the last route they were on. */}
//                 <Button variant="outline-danger mr-2" size="">Cancel</Button>

//                 <br></br>
//             </form>
//         );
//     };
// }

// const mapStateToProps = (state) => {
//   return state
// }

// export default connect(mapStateToProps, actions)(SubmitQuestion)