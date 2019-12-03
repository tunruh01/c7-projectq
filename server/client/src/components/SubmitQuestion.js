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

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-group input-lg" placeholder="Start your question with What, How, Why, etc" type="text" {...field.input} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
        <div className="text-right">
          <a href='/'><Button variant="outline-danger mr-2" size="sm">Cancel</Button></a>
          <Button type="submit" variant="outline-secondary mr-2" size="sm">Submit</Button>
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createQuestion(values, () => {
      this.props.history.replace('/');
      window.location.reload();
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="form">
        <div className="form-group" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <legend>Ask Question Below</legend>
          <label className="k-form-field">
            <span>Question:</span>
            <Field
              name="question"
              component={this.renderField}
            />
          </label>
          <Field
            name='topics'
            component={CheckboxGroup}
            options={this.props.category.topics}
          />
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

export default reduxForm({ form: 'questionNew' })(connect(mapStateToProps, mapDispatchToProps)(SubmitQuestion));
