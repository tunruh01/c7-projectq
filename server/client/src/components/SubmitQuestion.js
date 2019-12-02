import React, { Component } from 'react';
import { Field, reduxForm } from "redux-form";
import "../App.css";
import { Button } from "react-bootstrap";
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

  onSubmit(values) {
    this.props.createQuestion(values, () => {
      console.log('submitting question')
      // this.props.history.push("/question/{questionId}");
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (

      <div className="row example-wrapper">
        <div className="col-xs-12 col-sm-6 offset-sm-3 example-col">
          <div className="card">
            <div className="card-block">
              <form className="k-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <legend>Ask Question Below</legend>
                  <Field
                    name="question"
                    label="Question:"
                    placeholder="Start your question with What, How, Why, etc"
                    component={this.renderField}
                  />
                  <label className="k-form-field">
                    <span>Question: </span>
                    <input className="k-textbox" placeholder="Start your question with What, How, Why, etc" />
                  </label>
                  {/* <div className="k-form-field">
                    <span>Choose Categories: </span>

                    <input type="radio" name="topics" id="latin" className="k-radio" />
                    <label component={this.renderField} className="k-radio-label mr-2" for="latin"> Latin </label>

                    <input type="radio" name="topics" id="languages" className="k-radio" checked="checked" />
                    <label component={this.renderField} className="k-radio-label mr-2" for="languages"> Languages </label>
                  </div>
                  <div className="text-right">
                    <Button variant="outline-danger mr-2" size="sm">Cancel</Button>
                    <Link exact to="/"><Button variant="outline-secondary mr-2" size="sm">Submit</Button></Link>
                  </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>

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
