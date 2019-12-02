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
