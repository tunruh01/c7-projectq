import React, { Component } from 'react';
import { Field, reduxForm } from "redux-form";
import "../App.css";
import { Button } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from '../actions/actions';
import CheckboxGroup from './checkboxGroup'

class SubmitQuestion extends Component {

  componentDidMount() {
    this.props.fetchCategories();
  }
  onSubmit(values) {
    this.props.createQuestion(values, () => {
      this.props.history.replace('/');
      window.location.reload();
    });
  }

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
  
  questionInput() {

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
                  <label className="k-form-field">
                    <span>Question:</span>
                    <Field
                    name="question"
                    placeholder="Start your question with What, How, Why, etc"
                    component={'input'}
                    />                  
                  </label>
                  {/* <div>
                    {this.renderTopicChecklist(this.props.category.topics)}
                  </div> */}
                  <Field
                  name='topics'
                  component={CheckboxGroup}
                  options={this.props.category.topics}
                  />
                  {/* <div className="k-form-field">
                    <span> Choose Categories: </span>

                    <input type="radio" name="topics" id="latin" className="k-radio" />
                    <label component={this.renderField} className="k-radio-label mr-2" for="latin"> Latin </label>

                    <input type="radio" name="topics" id="languages" className="k-radio" checked="checked" />
                    <label component={this.renderField} className="k-radio-label mr-2" for="languages"> Languages </label>
                  </div> */}
                  <div className="text-right">
                    <a href='/'><Button variant="outline-danger mr-2" size="sm">Cancel</Button></a>
                    <Button type="submit" variant="outline-secondary mr-2" size="sm">Submit</Button>
                  </div>
                   
              </form>
            </div>
          </div>
        </div>
      </div>

    );
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

const mapStateToProps = (state) => {
  return state
}

export default reduxForm({form: 'questionNew'})(connect(mapStateToProps, mapDispatchToProps)(SubmitQuestion));